import { Router } from "express";
const teacherRoute = Router();
import { teacherLogin } from "../../controller/teacher/teacherCotroller";

teacherRoute.route("/").post(teacherLogin);

export default teacherRoute;
