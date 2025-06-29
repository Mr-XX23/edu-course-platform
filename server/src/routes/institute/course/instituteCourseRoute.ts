import { Router, Request } from "express";
const instituteCourseRouter:Router = Router();
import isLoggedIn from "../../../middleware/authMiddleware"; 
//import { multer, storage } from "../../../middleware/multerMiddleware";

import { multer,cloudinary, storage } from "../../../services/cloudinaryConfig";

import { AddCourse, deleteCourse, getAllCourses, getCourseById } from "../../../controller/institute/course/instituteCourseController";
// Importing the multer middleware for local file storage
// const upload = multer({storage : storage})

const upload = multer({
    storage: storage,
    fileFilter: (req:Request, file:Express.Multer.File, cb:any) => {
        const allwowedTypes = [ 'image/png', 'image/jpg', 'image/jpeg' ]
        if (allwowedTypes.includes(file.mimetype)) {
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

instituteCourseRouter.route("/").post(isLoggedIn, upload.single("courseThumbnail"), AddCourse).get(isLoggedIn, getAllCourses);
instituteCourseRouter.route("/:id").delete(isLoggedIn, deleteCourse).get(isLoggedIn, getCourseById);

export default instituteCourseRouter;