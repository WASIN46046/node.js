import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import {CloudinaryStorage} from "multer-storage-cloudinary";
import dotenv from 'dotenv';
dotenv.config();


const cloudinary = cloudinaryPackage.v2;

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});
//create storage engine for multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats:["jpg","png","jpeg"],
    params:{
        folder:"ecommerce",
    },
});

//Init multer with storage engine
const upload = multer({ 
    storage:storage
});


export default upload;