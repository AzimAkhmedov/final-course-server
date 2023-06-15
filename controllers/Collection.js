import Collection from "../models/Collection.js";
import Item from "../models/Item.js";
import User from "../models/User.js";

class CollectionController {
  async createNewCollection(req, res) {
    const { username, params, collectionName } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем не существует" });
    }
    const collection = await Collection.findOne({ collectionName, username });
    if (collection && collection.username === username) {
      return res
        .status(400)
        .json({ message: "Такая коллекция у данного юзера уже есть" });
    }

    const newCollection = new Collection({ username, collectionName, params });
    await newCollection.save();
    return res.json({ message: "Успешно добавленно" });
  }
  async deleteCollection(req, res) {
    const username = req.params.username;
    const collectionName = req.params.collectionName;
    const collection = await Collection.findOne({ collectionName, username });
    await collection.deleteOne();
    return res.json({ message: "Успешно удалено" });
  }
  async getUserCollections(req, res) {
    const username = req.params.username;
    let collection = [];
    collection = await Collection.find({ username });
    return res.json({ collection, username });
  }
  async addToCollection(req, res) {
    const { username, collectionName, params } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем не существует" });
    }
    const collection = await Collection.findOne({ collectionName, username });
    if (!collection) {
      return res
        .status(400)
        .json({ message: "У этого пользователя нет такой коллекции" });
    }
    const item = new Item({ collectionName, params, username });
    await item.save();
    return res.json({ message: "Сохранено" });
  }
  async removeFromCollection(req, res) {
    const _id = req.params._id;
    const item = await Item.findOne({ _id });
    if (!item) {
      return res.status(400).json({ message: "Нету такого айтема" });
    }
    await item.deleteOne();
    return res.json({ message: "Удаленно" });
  }
  async getCurrentCollection(req, res) {
    const { collectionName, username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем не существует" });
    }
    const collection = await Collection.findOne({ collectionName, username });
    if (!collection) {
      return res
        .status(400)
        .json({ message: "У этого пользователя нет такой коллекции" });
    }
    const items = await Item.find({ collectionName, username });
    return res.json(items);
  }
}

export default new CollectionController();