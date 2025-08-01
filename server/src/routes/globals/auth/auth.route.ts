import { Router } from "express";
const authRouter:Router = Router();
import { registerUser, loginUser, logoutUser, refreshToken, getCurrentUser } from "../../../controller/globals/auth/auth.controller";
import isLoggedIn from "../../../middleware/authMiddleware";

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/refresh").post(refreshToken);
authRouter.route("/logout").post(isLoggedIn, logoutUser);
authRouter.route("/me").get(isLoggedIn, getCurrentUser);

export default authRouter;

    
