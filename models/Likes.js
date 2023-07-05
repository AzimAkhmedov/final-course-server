import { Schema, model } from "mongoose";

const Likes = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  itemId: { type: String, unique: false },
  wholikes: { type: String, required: true, unique: false },
});

export default model("Likes", Likes);
