import { Router } from "express";
import { CollectionController } from "../controllers/index.js";
const collectionRouter = new Router();
collectionRouter.post("/", CollectionController.createNewCollection);
collectionRouter.get("/user/:username", CollectionController.getUserCollections);
collectionRouter.delete("/delete/:_id", CollectionController.deleteCollection);
collectionRouter.post("/add", CollectionController.addToCollection);
collectionRouter.delete(
  "/item/:_id",
  CollectionController.removeFromCollection
);
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
  "/getgapes/:pagination/:tags",
  CollectionController.getByTheme
);
collectionRouter.get("/pages/amount", CollectionController.getPagesAmount);
collectionRouter.get("/tags/item", CollectionController.getTags);
collectionRouter.get(
  "/largest/mostFive/",
  CollectionController.getFiveMostCollections
);
collectionRouter.get(
  "/img/:username/:collection",
  CollectionController.getCollectionImg
);
collectionRouter.get("/current/:_id", CollectionController.getCollectionById);
export default collectionRouter;
