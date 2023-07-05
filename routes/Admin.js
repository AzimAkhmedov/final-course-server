import { Router } from "express";
import { AdminController } from "../controllers/index.js";

const adminRouter = new Router();

adminRouter.delete('/:username', AdminController.deleteAdmin)
adminRouter.post("/")