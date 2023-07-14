import { Schema, model } from "mongoose";

const Collection = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  description: { type: String },
  params: [Schema.Types.Mixed],
  theme: { type: String },
  imgUrl: { type: String },
});

export default model("Collection", Collection);
