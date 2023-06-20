import { Schema, model } from "mongoose";

const Likes = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  itemId: { type: Number },
  wholikes: { type: String, required: true, unique: true },
});

export default model("Likes", Likes);
