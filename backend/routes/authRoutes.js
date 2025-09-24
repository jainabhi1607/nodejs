import { Router } from "express";
import {
  login,
  register,
  authCheck
} from "../controllers/authController.js";



const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/authCheck", authCheck);

export default authRouter;
