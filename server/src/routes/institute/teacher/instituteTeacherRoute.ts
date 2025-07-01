import { Router } from "express";
import isLoggedIn from "../../../middleware/authMiddleware";
import { addTeacher, getTeacher, deleteTeacher } from "../../../controller/institute/teacher/instituteTeacherController";
import upload from "../../../services/uploadMulterConfig";

const instituteTeacherRouter: Router = Router();

instituteTeacherRouter.route("/").post(isLoggedIn, upload.single("teacherImage"), addTeacher).get(isLoggedIn, getTeacher);
instituteTeacherRouter.route("/:id").delete(isLoggedIn, deleteTeacher);


export default instituteTeacherRouter;
