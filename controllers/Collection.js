import Collection from "../models/Collection.js";
import Item from "../models/Item.js";
import Tags from "../models/Tags.js";
import User from "../models/User.js";

class CollectionController {
  async createNewCollection(req, res) {
    const { username, params, collectionName, description, theme } = req.body;
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
      theme,
    });
    await newCollection.save();
    return res.json({ message: "Успешно добавленно" });
  }
  async deleteCollection(req, res) {
    const { _id } = req.params;
    const collection = await Collection.findById(_id);
    const items = await Item.find({
      collectionName: collection.collectionName,
      username: collection.username,
    });
    const data = await Item.find();
    collection.deleteOne();
    items.forEach(async (e) => {
      e.tags.forEach(async (a) => {
        const filtred = data.filter((c) => c.tags.includes(a));
        if (!filtred) {
          await Tags.findOne({ tag: a }).deleteOne();
        }
      });

      await e.deleteOne();
    });
    return res.json({ message: "Успешно удалено" });
  }
  async getUserCollections(req, res) {
    const username = req.params.username;
    let collection = [];
    collection = await Collection.find({ username });
    return res.json(collection);
  }
  async addToCollection(req, res) {
    const { username, itemName, collectionName, params, tags } = req.body;
    const user = await User.findOne({ username });
    if (!params) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем не существует" });
    }
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
    tags.forEach(async (tag) => {
      const isExist = await Tags.findOne({ tag });

      if (!isExist) {
        const newtag = new Tags({ tag });
        await newtag.save();
      }
    });
    const item = new Item({ collectionName, params, username, tags, itemName });
    await item.save();
    return res.json(item);
  }
  async removeFromCollection(req, res) {
    const _id = req.params._id;
    const item = await Item.findOne({ _id });
    const data = await Item.find();

    item.tags.forEach(async (a) => {
      const filtred = data.filter((c) => c.tags.includes(a));
      if (filtred.length === 1) {
        await Tags.findOne({ tag: a }).deleteOne();
      }
    });
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
    return res.json(collection.params);
  }
  async getLastCollections(req, res) {
    try {
      const { pagination } = req.params;
      const data = await Item.find();
      data.reverse();
      let arr = [];
      if ((pagination - 1) * 9 > data.length) {
        return res.status(400).json({ message: "Empty page" });
      }

      for (let i = (pagination - 1) * 9; i < 9 * pagination; i++) {
        if (i >= data.length) break;
        arr.push(data[i]);
      }
      return res.json(arr);
    } catch (e) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async getPagesAmount(req, res) {
    const data = await Item.find();
    return res.json({ pages: Math.ceil(data.length / 9) });
  }
  async getByTheme(req, res) {
    const { pagination, tags } = req.params;
    const data = await Item.find();
    const filtred = data.filter((e) => e.tags.includes(tags));
    filtred.reverse();
    let arr = [];
    if ((pagination - 1) * 9 > data.length) {
      return res.status(400).json({ message: "Empty page" });
    }

    for (let i = (pagination - 1) * 9; i < 9 * pagination; i++) {
      if (i >= filtred.length) break;
      arr.push(filtred[i]);
    }
    return res.json(arr);
  }
  async getTags(req, res) {
    const data = await Tags.find();
    return res.json(data);
  }
  async getFiveMostCollections(req, res) {
    const items = await Item.find();
    const collections = await Collection.find();

    let colls = [];
    collections.forEach((e) => {
      colls.push({
        username: e.username,
        collectionName: e.collectionName,
        description: e.description,
        theme: e.theme,
        imgUrl: e.imgUrl,
      });
    });
    let ctr = new Array(colls.length).fill(0);
    items.forEach((e, i) => {
      let a = colls.findIndex(
        (a) =>
          a.collectionName === e.collectionName && a.username === e.username
      );
      ctr[a]++;
    });
    let data = [];
    let ctrCopy = [...ctr];
    let max = ctr[0];
    let idx = 0;
    let length = colls.length < 5 ? colls.length : 5;
    for (let i = 0; i < length; i++) {
      for (let g = 0; g < ctrCopy.length; g++) {
        if (max < ctrCopy[g]) {
          max = ctrCopy[g];
          idx = g;
          ctrCopy[g] = 0;
        }
      }
      data.push(colls[idx]);
      ctrCopy[idx] = 0;
      max = ctrCopy[0];
      idx = 0;
    }
    return res.json(data);
  }
  async getCollectionImg() {
    const { _id } = req.params;
    const collection = await Collection.findById(_id);
    if (!collection) {
      return res.status(400).json({ message: "No scuh collection" });
    }
    return res.json({ imgUrl: collection.imgUrl });
  }
}

export default new CollectionController();
