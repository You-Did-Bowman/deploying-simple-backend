import mongoose from "mongoose";

// we use "mongoose.connect()" which creates a Promise therefor we have to use a async-function
export const connect2DB = async () => {try {

    // if the connection is successfull, we log it (sanity check)
    mongoose.connection.on("connected", () =>
      console.log("✅ DB Connection Established.")
    );

    // if the connection fails, we log it (sanity check again)
    mongoose.connection.on("error", (err) => console.error(err.message));
  
    // if we get a successfull Promise we will connect to the database while catching the login data from .env
    await mongoose.connect(process.env.mongoUri);
  } catch (error) {
    console.error(error.message);
  }
}