import Comments from "../models/Comments.js";
import Item from "../models/Item.js";
import User from "../models/User.js";
import Likes from "../models/Likes.js";
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
  async updateItem(req, res) {
    const { _id, collectionName, params, username, itemName, tags } = req.body;
    const found = await Item.findOne({ _id });
    const update = { collectionName, params, username, itemName, tags };
    await found.replaceOne(update);
    return res.json(found);
  }
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
      return res.json(comments.reverse());
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async getLikes(req, res) {
    try {
      const { itemId } = req.params;
      const likesAmount = await Likes.find({ itemId });
      return res.json(likesAmount);
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async isLiked(req, res) {
    const { itemId, wholikes } = req.params;
    const liked = await Likes.findOne({ wholikes, itemId });
    let ans = false;
    if (liked) {
      ans = true;
    }
    return res.json(ans);
  }

  async PressLike(req, res) {
    const { wholikes, itemId, username, collectionName } = req.body;
    const liked = await Likes.findOne({ wholikes, itemId });

    if (liked) {
      liked.deleteOne();
    } else {
      const like = new Likes({ collectionName, username, wholikes, itemId });
      await like.save();
      return res.json(like);
    }
    return res.json(liked);
  }
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

      const itemComment = new Comments(newComment);

      await itemComment.save();

      return res.json(itemComment);
    } catch (error) {
      return res.status(400).json({ message: "Error" });
    }
  }
  async deleteComment(req, res) {
    const { _id } = req.params;
    const found = await Comments.findOne({ _id });
    await found.deleteOne();
  }
  async updateComment(req, res) {
    const { _id, username, collectionName, itemId, authorName, comment } =
      req.body;
    const found = await Comments.findOne({ _id });
    const update = {
      username,
      collectionName,
      itemId,
      authorName,
      comment,
      time: new Date().toLocaleString("en-En", { dateStyle: "short" }),
    };
    await found.updateOne(update);
    return res.json(update);
  }
}

export default new ItemController();
