import {v2 as cloudinary} from 'cloudinary';
import { on } from 'events';
import fs from "fs";  // fs is file system and is already built in node.js

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const ressponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        //file has been uploaded on cloudinary
        console.log("File uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);  //delete the file from local storage as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary}