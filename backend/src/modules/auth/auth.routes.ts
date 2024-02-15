import { Router } from "express";

import AuthController from "./auth.controller";
import isAuthenticated from "@/middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", AuthController.signup);
authRouter.post("/login", AuthController.login);
authRouter.get("/me", isAuthenticated, AuthController.getMe);

export default authRouter;
