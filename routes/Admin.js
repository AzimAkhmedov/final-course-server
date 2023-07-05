import { Router } from "express";
import { AdminController } from "../controllers/index.js";

const adminRouter = new Router();

adminRouter.post("/create", AdminController.createAdmin);
adminRouter.post("/", AdminController.isAdmin);
adminRouter.delete("/removeFromAdmin/:_id/:token", AdminController.deleteAdmin);
adminRouter.delete("/removeFromAdmin/:_id/:token", AdminController.deleteAdmin);
adminRouter.put("/collections/update", AdminController.updateCollection);
adminRouter.delete(
  "/collections/delete/:_id/:token/",
  AdminController.updateCollection
);

export default adminRouter;
