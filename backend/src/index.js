// this file involves connection to the database

import dotenv from "dotenv";
import connectDB from './db/index.js';
import {app} from './app.js';

dotenv.config({
    path: './.env'
});

// Approach 1:
connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGO db connection failed!!!", error);
});

// Approach 2: 
/*
import {DB_NAME} from './constants.js';
import mongoose from 'mongoose';
( async()=> {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR:", error)
            throw error;
        })
        app.listen( process.env.PORT, ()=> {
            console.log(`App is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
    }
}) ()                     //this is a kind of IIFE
*/