import { Router } from "express";
import { AdminController } from "../controllers/index.js";

const adminRouter = new Router();

adminRouter.post("/create", AdminController.createAdmin);
adminRouter.post("/", AdminController.isAdmin);
adminRouter.delete("/removeFromAdmin/:_id/:token", AdminController.deleteAdmin);
adminRouter.delete(
  "/collections/delete/:_id/:token/",
  AdminController.DeleteCollection
);
adminRouter.get("/collections/", AdminController.getCollections);
adminRouter.get("/collections/amount", AdminController.getCollectionsPages);

export default adminRouter;
