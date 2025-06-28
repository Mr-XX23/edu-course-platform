import { Router } from "express";
import isLoggedIn from "../../../middleware/authMiddleware";
import { getStudents } from "../../../controller/institute/Student/instituteStudentController";

const instituteStudentRouter: Router = Router();

instituteStudentRouter.route("/").get(isLoggedIn, getStudents);

export default instituteStudentRouter;