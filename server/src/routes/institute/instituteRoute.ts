import { Router } from "express";
const instituteRouter:Router = Router();
import { createInstitute, intituteCreatedByUserHistory, createTeacher, createdStudent, createCourse, createCategory } from '../../controller/institute/instituteController'
import isLoggedIn from "../../middleware/authMiddleware";

instituteRouter.route("/create-institute").post(isLoggedIn, createInstitute, intituteCreatedByUserHistory, createTeacher, createdStudent, createCourse, createCategory);

export default instituteRouter;