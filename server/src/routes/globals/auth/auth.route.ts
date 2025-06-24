import { Router } from "express";
const authRouter:Router = Router();
import { registerUser, loginUser } from "../../../controller/globals/auth/auth.controller";

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);

export default authRouter;

    
