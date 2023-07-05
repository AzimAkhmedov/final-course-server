import { Schema, model } from "mongoose";

const Tags = new Schema({
  tag: { type: String, required: true },
});

export default model("Tags", Tags);
