import { Router } from "express";
import cors from "cors";
import { loginUser, registerUser} from "../controller/authController.js";

const authRouter=Router();


authRouter.post("/login",loginUser)
authRouter.post("/register",registerUser)


export default authRouter;
