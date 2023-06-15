import { Schema, model } from "mongoose";

const Item = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  params: [Schema.Types.Mixed],
});

export default model("Item", Item);
