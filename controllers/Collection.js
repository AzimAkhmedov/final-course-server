import Collection from "../models/Collection.js";
import Item from "../models/Item.js";
import User from "../models/User.js";

class CollectionController {
  async createNewCollection(req, res) {
    const { username, params, collectionName, description } = req.body;
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

    const newCollection = new Collection({
      username,
      collectionName,
      params,
      description,
    });
    await newCollection.save();
    return res.json({ message: "Успешно добавленно" });
  }
  async deleteCollection(req, res) {
    const { _id } = req.params;
    const collection = await Collection.findById(_id);
    console.log(_id);
    collection.deleteOne();
    return res.json({ message: "Успешно удалено" });
  }
  async getUserCollections(req, res) {
    const username = req.params.username;
    let collection = [];
    collection = await Collection.find({ username });
    return res.json(collection);
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
  async getCollectionParams(req, res) {
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
    console.log(user, collection);
    return res.json(collection.params);
  }
  async getLastCollections(req, res) {
    try {
      const { pagination } = req.params;
      const data = await Collection.find();
      console.log(pagination);
      data.reverse();
      let arr = [];
      if ((pagination - 1) * 20 > data.length) {
        return res.status(400).json({ message: "Empty page" });
      }

      for (let i = (pagination - 1) * 20; i < 20 * pagination; i++) {
        if (i >= data.length) break;
        arr.push(data[i]);
      }
      return res.json(arr);
    } catch (e) {
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new CollectionController();
