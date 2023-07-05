import { Schema, model } from "mongoose";

const Likes = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  itemId: { type: String },
  wholikes: { type: String, required: true,  },
});

export default model("Likes", Likes);
