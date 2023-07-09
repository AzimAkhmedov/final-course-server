import { secret } from "../config.js";
import User from "../models/User.js";
import Item from "../models/Item.js";

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
    await found.replaceOne({
      username: found.username,
      password: found.password,
      role: "User",
      status: found.status,
    });
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
    const collection = found;

    await found.deleteOne();
    const items = await Item.find({
      collectionName: collection.collectionName,
      username: collection.username,
    });
    items.forEach(async (e) => {
      await e.deleteOne();
    });
    return res.json({ message: "Deleted!" });
  }

  async getCollections(req, res) {
    const data = await Collection.find();

    return res.json(data);
  }
  async getCollectionsPages(req, res) {
    const data = await Collection.find();
    return res.json({ pages: Math.ceil(data.length / 9) });
  }
  async getCurrentCollection(req, res) {
    const { token, _id } = req.params;
    if (!chechIsAdmin(token)) {
      return res.status(400).json({ message: "You have no permission" });
    }
    const found = await Collection.findOne({ _id });
    const items = await Item.find({
      username: found.username,
      collectionName: found.collectionName,
    });
    return res.json(items);
  }
  async deleteUser(req, res) {
    const { username, token } = req.params;
    const found = await Collection.find({ username });
    const foundItems = await Item.find({ username });
    const user = await User.findOne({ username });
    if (!chechIsAdmin(token)) {
      return res.status(400).json({ message: "You have no permission" });
    }
    found.forEach(async (e) => {
      await e.deleteOne();
    });
    foundItems.forEach(async (e) => {
      await e.deleteOne();
    });
    await user.deleteOne();
    return res.json({ message: "Success" });
  }
  async setStatus(req, res) {
    const { username, status, token } = req.body;
    if (!chechIsAdmin(token)) {
      return res.status(400).json({ message: "You have no permission" });
    }
    const found = await User.findOne({ username });
    const replaced = {
      username,
      status,
      password: found.password,
      role: found.role,
    };
    await found.replaceOne(replaced);
    return res.json({ message: "success" });
  }
  async getAllItems(req, res) {
    const { token } = req.params;
    if (!chechIsAdmin(token)) {
      return res.status(400).json({ message: "You have no permission" });
    }
    const item = await Item.find();
    return res.json(item);
  }
}

export default new AdminController();
