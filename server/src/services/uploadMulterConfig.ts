import { Request } from "express";
import { multer, storage } from "../services/cloudinaryConfig";

const upload = multer({
    storage: storage,
    fileFilter: (req:Request, file:Express.Multer.File, cb:any) => {
        const allowedTypes = [ 'image/png', 'image/jpg', 'image/jpeg' ]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("File type not allowed. Only PNG, JPG, and JPEG are allowed."));
        }

    },
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    }
}
);

export default upload;