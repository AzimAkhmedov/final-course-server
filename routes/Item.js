import { Router } from "express";
import ItemController from "../controllers/Item.js";
const itemRouter = new Router();

itemRouter.get("/get/:_id", ItemController.getItem);
itemRouter.post("/", ItemController.createItem);
itemRouter.delete("/delete/:_id", ItemController.deleteItem);

export default itemRouter