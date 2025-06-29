
import { Router } from "express";
import isLoggedIn from "../../../middleware/authMiddleware";
import { createCategory, getCategories, deleteCategory } from "../../../controller/institute/category/categoryController";

const categoryRouter = Router();

categoryRouter.route("/").post(isLoggedIn, createCategory).get(isLoggedIn, getCategories);
categoryRouter.route("/:id").delete(isLoggedIn, deleteCategory);

export default categoryRouter;