import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";  // fs is used to delete local files if upload fails.
import dotenv from "dotenv";
dotenv.config({path: './.env'});

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detects file type (image, video, etc.).
        });

        // File uploaded successfully
        console.log("File uploaded on Cloudinary", response.secure_url);
        return response;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        // Delete the file from local storage only if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return null;
    }
};

export { uploadOnCloudinary };
