import { Router } from "express";
import ItemController from "../controllers/Item.js";
const itemRouter = new Router();

itemRouter.get("/get/:_id", ItemController.getItem);
itemRouter.post("/", ItemController.createItem);
itemRouter.delete("/delete/:_id", ItemController.deleteItem);
itemRouter.get("/comments/get/:itemId", ItemController.getComments);
itemRouter.post("/comments/create", ItemController.WriteComment);
export default itemRouter;
