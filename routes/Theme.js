import { Router } from "express";
import ThemeController from "../controllers/Themes.js";

const ThemeRouter = new Router();

ThemeRouter.get("/", ThemeController.get);
ThemeRouter.post("/", ThemeController.create);
ThemeController.delete("/:_id", ThemeController.delete);
export default ThemeRouter;
