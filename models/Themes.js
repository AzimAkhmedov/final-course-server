import { Schema, model } from "mongoose";

const Theme = new Schema({
  theme: { type: String, required: true },
  themeRu: { type: String },

});

export default model("Theme", Theme);
