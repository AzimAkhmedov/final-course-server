import Themes from "../models/Themes.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const chechIsAdmin = (token) => {
  const decoded = jwt.decode(token);
  return decoded.role === "Admin";
};
class ThemeController {
  async create(req, res) {
    try {
      const { theme, themeRu, token } = req.body;
      const variant = await Themes.findOne({ theme });
      const variant2 = await Themes.findOne({ themeRu });
      if (!chechIsAdmin(token)) {
        return res.status(400).json({ message: "You are not admin" });
      }
      if (variant || variant2) {
        return res.status(400).json({
          message: "Such theme is already exist ",
          messageRu: "Такая тематика уже существует!",
        });
      }

      const newTheme = new Themes({ theme, themeRu });
      await newTheme.save();
      return res.json(newTheme);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
  async delete(req, res) {
    try {
      const { _id, token } = req.params;
      const theme = Themes.findOne(_id);
      if (!chechIsAdmin(token)) {
        return res.status(400).json({ message: "You are not admin" });
      }
      await theme.deleteOne();
      return res.json(newTheme);
    } catch (error) {}
  }
  async get(req, res) {
    const themes = await Themes.find();
    return res.json(themes);
  }
  async update(req, res) {}
}

export default new ThemeController();
