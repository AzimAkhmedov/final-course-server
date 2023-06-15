import { Schema, model } from "mongoose";

const Collection = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  params: [Schema.Types.Mixed],
});

export default model("Collection", Collection);
