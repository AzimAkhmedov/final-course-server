import { Router } from "express";
import controller from "../controllers/Auth.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { check } from "express-validator";
const authRouter = new Router();

authRouter.post(
  "/registration",
  controller.registration
);
authRouter.post(`/login`, controller.login);
authRouter.get(`/check`, authMiddleware, controller.check);
authRouter.get(`/users`, controller.getUsers);

export default authRouter;
