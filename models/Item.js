import { Schema, model } from "mongoose";

const Item = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  comments: { type: Array },
  params: [Schema.Types.Mixed],
});

export default model("Item", Item);
