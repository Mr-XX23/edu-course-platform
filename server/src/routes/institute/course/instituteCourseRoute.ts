import { Router } from "express";
const instituteCourseRouter:Router = Router();
import isLoggedIn from "../../../middleware/authMiddleware"; 
//import { multer, storage } from "../../../middleware/multerMiddleware";

import { multer,cloudinary, storage } from "../../../services/cloudinaryConfig";

import { AddCourse, deleteCourse, getAllCourses, getCourseById } from "../../../controller/institute/course/instituteCourseController";
// Importing the multer middleware for local file storage
// const upload = multer({storage : storage})

const upload = multer({
    storage: storage
});

instituteCourseRouter.route("/").post(isLoggedIn, upload.single("courseThumbnail"), AddCourse).get(isLoggedIn, getAllCourses);
instituteCourseRouter.route("/:id").delete(isLoggedIn, deleteCourse).get(isLoggedIn, getCourseById);

export default instituteCourseRouter;