import { Router } from "express";
const instituteCourseRouter:Router = Router();
 import isLoggedIn from "../../../middleware/authMiddleware"; 
import { AddCourse, deleteCourse, getAllCourses, getCourseById } from "../../../controller/institute/course/instituteCourseController";

instituteCourseRouter.route("/").post(isLoggedIn, AddCourse).get(isLoggedIn, getAllCourses);
instituteCourseRouter.route("/:id").delete(isLoggedIn, deleteCourse).get(isLoggedIn, getCourseById);

export default instituteCourseRouter;