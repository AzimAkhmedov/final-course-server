import { secret } from "../config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Collection from "../models/Collection.js";
const chechIsAdmin = (token) => {
  const decoded = jwt.decode(token);
  return decoded.role === "Admin";
};
class AdminController {
  async isAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: `Не правильно введены данные`,
          isAdmin: true,
        });
      }
      if (user.role === "Admin") {
        const token = jwt.sign({ role: "Admin" }, secret);
        return res.json({ isAdmin: true, token });
      }
      return res.json({ isAdmin: false });
    } catch (error) {
      return res.json(error);
    }
  }
  async createAdmin(req, res) {
    const { username, token } = req.body;
    if (!chechIsAdmin(token)) {
      res.status(400).json({ message: "У вас нет прав администратора" });
    }
    const found = await User.findOne({ username });
    const user = {
      username,
      password,
      role: "Admin",
    };
    await found.replaceOne(user);
    res.json({ message: "Админ сохранен" });
  }
  async deleteAdmin(req, res) {
    const { _id, token } = req.params;
    const found = await User.findOne({ _id });
    if (!chechIsAdmin()) {
      return res
        .status(400)
        .json({ message: "Вы не владеете правами администатора" });
    }
    await found.deleteOne();
    return res.json(found);
  }
  async DeleteCollection(req, res) {
    const { token, _id } = req.params;
    const found = await Collection.findOne({ _id });
    if (!chechIsAdmin(token)) {
      return res
        .status(400)
        .json({ message: "Вы не владеете правами администатора" });
    }
    await found.deleteOne();
  }
  async deleteUser(req, res) {
    const { token, _id } = req.params;
    const found = await User.findOne({ _id });
    if (chechIsAdmin(token)) {
      await found.deleteOne();
      return res.json({ message: "deleted" });
    }
    return res.status(400).json({ message: "Вы не админ" });
  }
  async getCollections(req, res) {
    const data = await Collection.find();
    
    return res.json(data);
  }
  async getCollectionsPages(req, res) {
    const data = await Collection.find();
    return res.json({ pages: Math.ceil(data.length / 9) });
  }
}

export default new AdminController();
