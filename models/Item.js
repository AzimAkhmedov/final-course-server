import { Schema, model } from "mongoose";

const Item = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  params: Schema.Types.Mixed,
  itemName: { type: String },
  tags: { type: Array },
});

export default model("Item", Item);
