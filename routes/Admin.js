import { Router } from "express";
import { AdminController } from "../controllers/index.js";

const adminRouter = new Router();

adminRouter.post("/create", AdminController.createAdmin);
adminRouter.post("/", AdminController.isAdmin);
adminRouter.delete("/removeFromAdmin/:_id/:token", AdminController.deleteAdmin);
adminRouter.delete("/removeFromAdmin/:_id/:token", AdminController.deleteAdmin);
adminRouter.delete(
  "/collections/delete/:_id/:token/",
  AdminController.DeleteCollection
);

export default adminRouter;
