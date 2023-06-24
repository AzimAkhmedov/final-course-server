import { Router } from "express";
import { CollectionController } from "../controllers/index.js";
const collectionRouter = new Router();
collectionRouter.post("/", CollectionController.createNewCollection);
collectionRouter.get("/:username", CollectionController.getUserCollections);
collectionRouter.delete("/delete/:_id", CollectionController.deleteCollection);

collectionRouter.post("/add", CollectionController.addToCollection);
collectionRouter.delete("/item/:_id", CollectionController.removeFromCollection);
collectionRouter.get(
  "/usercollection/:username/:collectionName",
  CollectionController.getCurrentCollection
);
collectionRouter.get(
  "/params/:username/:collectionName",
  CollectionController.getCollectionParams
);
collectionRouter.get(
  "/getpages/:pagination",
  CollectionController.getLastCollections
);
collectionRouter.get(
  "/getgapes/:pagination/:theme",
  CollectionController.getByTheme
);
collectionRouter.get("/pages/amount", CollectionController.getPagesAmount);
export default collectionRouter;
