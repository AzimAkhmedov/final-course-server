import { Schema, model } from "mongoose";

const Collection = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  description: { type: String },
  params: [Schema.Types.Mixed],
});

export default model("Collection", Collection);
