import Themes from "../models/Themes.js";

class ThemeController {
  async create(req, res) {
    try {
      const { theme } = req.body;
      const newTheme = new Themes(theme);
      await newTheme.save();
      return res.json(newTheme);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
  async delete(req, res) {
    try {
      const { _id } = req.params;
      const theme = Themes.findOne(_id);

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
