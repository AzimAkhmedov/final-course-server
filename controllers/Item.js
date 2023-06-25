import Comments from "../models/Comments.js";
import Item from "../models/Item.js";
import User from "../models/User.js";
import Collection from "../models/Collection.js";

class ItemController {
  async createItem(req, res) {
    try {
      const { username, collectionName, itemName, param } = req.body;

      const newItem = new Item({ collectionName, username, itemName, param });
      const user = await User.findOne({ username });
      const userCollection = await Collection.findOne({
        username,
        collectionName,
      });
      if (!user) {
        return res.status(400).json({ message: "Нету такого пользователя" });
      }
      if (!userCollection) {
        return res.status(400).json({ message: "Нету такой коллекции" });
      }
      await newItem.save();
      return res.json(newItem);
    } catch (error) {}
  }
  async deleteItem(req, res) {
    try {
      const { _id } = req.params;
      const item = Item.findOne(_id);
      await item.deleteOne();
    } catch (error) {}
  }
  async updateItem(req, res) {}
  async getItem(req, res) {
    try {
      const { _id } = req.params;
      const items = await Item.findById(_id);
      return res.json(items);
    } catch (error) {}
  }
  async getComments(req, res) {
    try {
      const { itemId } = req.params;
      const comments = await Comments.find({ itemId });
      // console.log(comments);
      return res.json(comments);
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async getLikes(req, res) {}
  async PressLike(req, res) {}
  async WriteComment(req, res) {
    try {
      const { username, collectionName, itemId, authorName, comment } =
        req.body;

      const newComment = {
        username,
        collectionName,
        itemId,
        authorName,
        comment,
        time: new Date().toLocaleString("en-En", { dateStyle: "short" }),
      };
      console.log(newComment);

      const itemComment = new Comments(newComment);
      await itemComment.save();

      return res.json(itemComment);
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
}

export default new ItemController();
