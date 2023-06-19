import { Schema, model } from "mongoose";

const Likes = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  itemId: { type: Number, unique: true },
  likedUsers: { type: Array },
});

export default model("Likes", Likes);
