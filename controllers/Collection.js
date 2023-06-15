import Collection from "../models/Collection";
import User from "../models/User";

class CollectionController {
  async createNewCollection(req, res) {
    const { username, params, collectionName } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким именем не существует" });
    }
    const collection = await Collection.findOne({ collectionName });
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
    const collection = await Collection.findOne({ username });
    return res.json({ collection });
  }
}

export default new CollectionController();
