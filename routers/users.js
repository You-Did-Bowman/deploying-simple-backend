// *** Import of packages ***
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from "uuid";

// *** Import of project files ***
import { getUsers, registerUser } from '../controllers/users.js';

// Build-in express function to handle the route on which we will call the controllers later -> at the end of this file
const router = express.Router();

// --------------------- SETUP MULTER ---------------------
// "multer.diskStorage()" creates a strategy to store uploads
const storage = multer.diskStorage({

    // "destination:" says where the upload should be stored
    destination: function (req, file, cb) {

        // if the folder is found ("null" errors) the upload is stored in "uploads/"
        cb(null, 'uploads/')
    },

    // "filename:" says how the upload should be named
    filename: function (req, file, cb) {

        //uuidv4 generates an unique ID ... the rest is self explaining
        const myFileName = uuidv4() + "_" + file.originalname

        req.myFileName = myFileName;

        // if the fileName is okay ("null" errors) the upload is named like "myFileName"
        cb(null, myFileName)
    }
});

// We create an instance which contains the storage strategy of "storage"
const upload = multer({storage})

// --------------------- IMPLEMENT CONTROLLERS ---------------------
router.get('/', getUsers);

// Wenn this route has a post request we will create an single file from the upload which is provide at the HTML-Formular-fieldname "profilepic"
router.post('/register', upload.single('profilepic'), registerUser);

export default router;