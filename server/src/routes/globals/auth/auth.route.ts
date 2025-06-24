import { Router } from "express";
import registerUser from "../../../controller/globals/auth/auth.controller";
const authRouter: Router = Router();

authRouter.route("/register").post(registerUser);


    export default authRouter;


