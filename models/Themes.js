import { Schema, model } from "mongoose";

const Theme = new Schema({
  theme: { type: String, required: true },
});

export default model("Theme", Theme);
