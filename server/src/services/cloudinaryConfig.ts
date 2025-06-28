import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { envConfig } from '../../config/config';

cloudinary.config( {
    cloud_name: envConfig.cloudinary.cloud_name,
    api_key: envConfig.cloudinary.api_key,
    api_secret: envConfig.cloudinary.api_secret,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req, file) => {
        return {
            folder: "fullstack-edu",
        };
    }
})

export { multer, cloudinary, storage };
