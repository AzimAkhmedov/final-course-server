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
adminRouter.delete("/deleteUser/:username/:token", AdminController.deleteUser);
adminRouter.get("/collections/", AdminController.getCollections);
adminRouter.get("/collections/amount", AdminController.getCollectionsPages);
adminRouter.put("/users/setStatus", AdminController.setStatus);
adminRouter.get("/item/:token", AdminController.getAllItems);

export default adminRouter;
