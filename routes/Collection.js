import { Router } from "express";
import { CollectionController } from "../controllers/index.js";
const collectionRouter = new Router();
collectionRouter.post("/", CollectionController.createNewCollection);
collectionRouter.get("/:username", CollectionController.getUserCollections);
collectionRouter.delete(
  "/:username/:collectionName",
  CollectionController.deleteCollection
);
collectionRouter.post("/add", CollectionController.addToCollection);
collectionRouter.delete("/:_id", CollectionController.removeFromCollection);
collectionRouter.get(
  "/:username/:collectionName",
  CollectionController.getCurrentCollection
);
collectionRouter.get(
  "/params/:username/:collectionName",
  CollectionController.getCollectionParams
);
export default collectionRouter;
