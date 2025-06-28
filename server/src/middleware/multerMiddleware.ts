import { Request } from "express";
import multer from "multer";

// Configure multer for file uploads for local storage
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, './src/storage');
    },
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, file.originalname + '-' + Date.now());
    }
})

export { multer, storage };