import { Router } from "express";
import controller from "../controllers/Collection.js";
const collectionRouter = new Router();
collectionRouter.post("/", controller.createNewCollection);
collectionRouter.get("/:username", controller.getUserCollections);
collectionRouter.delete(
  "/:username/:collectionName",
  controller.deleteCollection
);
collectionRouter.post("/add", controller.addToCollection);
collectionRouter.delete("/:_id", controller.removeFromCollection);
collectionRouter.get(
  "/:username/:collectionName",
  controller.getCurrentCollection
);
export default collectionRouter;
