// *** Import of packages ***
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

// *** Import of project files ***
import userRouter from './routers/users.js';
import { connect2DB } from './utils/db.js';
import { createError } from './utils/errors.js';


// Server learns how to read the .env for get the informations it needs - important for working in different environments like "Development" and "Production"
dotenv.config();

// --------------------- GENERADE SERVER ---------------------
const app = express();

// --------------------- GENERADE DATABASE CONNECTION ---------------------
connect2DB();

// --------------------- DEFINE MIDDLEWARES ---------------------
// Before we are starting with any middleware we check with cors if the Request comes from a trustworthy source
app.use(cors());

// If we trust we can create a JSON-File from the request
app.use(express.json())

// Sanity Middleware for debugging 
app.use(morgan('dev'));

// --------------------- DEFINE ROUTES ---------------------
// Uploads from "/uploads" will be stored in the folder "uploads"
app.use('/uploads', express.static('uploads'))

app.use('/users', userRouter);

// --------------------- ERROR HANDELING ---------------------
// As we do not specify a route, we make a wildcard here. Whenever there is no route that calls another middleware, this one is executed.
app.use((req, res, next) => {
  // We call the function from errors.js here and pass the values we want. It returns an err, so we can write it directly in the next() so that the error is passed on as a value.
  next(createError(404, "Route is not defined"));
});

// Now we intercept the error - MAIN ERROR HANDLER starts
app.use((err, req, res, next) => {
  if (err) {
    // Sometimes there are errors that have no status, so we add a default. 500 is a server error. We wrap everything in a JSON so that we get it readable in the respons. 
    res.status(err.status || 500 ).json({Error: err.message});
  }
});

// --------------------- START SERVER ---------------------
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is running on: http://localhost:${port}`));