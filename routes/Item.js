import { Router } from "express";
import ItemController from "../controllers/Item.js";
const itemRouter = new Router();
itemRouter.get("/get/:_id", ItemController.getItem);
itemRouter.post("/", ItemController.createItem);
itemRouter.delete("/delete/:_id", ItemController.deleteItem);
itemRouter.get("/comments/get/:itemId", ItemController.getComments);
itemRouter.post("/comments/create", ItemController.WriteComment);
itemRouter.get("/likes/:itemId", ItemController.getLikes);
itemRouter.get("/likes/:itemId/:wholikes", ItemController.isLiked);
itemRouter.post("/likes", ItemController.PressLike);
itemRouter.put("/update", ItemController.updateItem);

export default itemRouter;
