import { Router } from "express";
import controller from "../controllers/Collection.js";
const collectionRouter = new Router();
collectionRouter.post("/", controller.createNewCollection);
collectionRouter.get("/:username", controller.getUserCollections);
collectionRouter.delete(
  "/:username/:collectionName",
  controller.deleteCollection
);
export default collectionRouter;
