import { Schema, model } from "mongoose";

const Item = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  param: Schema.Types.Mixed,
  itemName: { type: String },
});

export default model("Item", Item);
