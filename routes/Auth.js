import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { check } from "express-validator";
const authRouter = new Router();

authRouter.post("/registration", AuthController.registration);
authRouter.post(`/login`, AuthController.login);
authRouter.get(`/check`, authMiddleware, AuthController.check);
authRouter.get(`/users`, AuthController.getUsers);

export default authRouter;
