
import { Router, Request } from "express";
const instituteCourseRouter:Router = Router();
import isLoggedIn from "../../../middleware/authMiddleware"; 
// Importing multer for file uploads for local storage
//import { multer, storage } from "../../../middleware/multerMiddleware";
import { addCourse, deleteCourse, getAllCourses, getCourseById } from "../../../controller/institute/course/instituteCourseController";
// Importing the upload configuration for handling file uploads for Coudinary
import upload from "../../../services/uploadMulterConfig";

instituteCourseRouter.route("/").post(isLoggedIn, upload.single("courseThumbnail"), addCourse).get(isLoggedIn, getAllCourses);
instituteCourseRouter.route("/:id").delete(isLoggedIn, deleteCourse).get(isLoggedIn, getCourseById);

export default instituteCourseRouter;