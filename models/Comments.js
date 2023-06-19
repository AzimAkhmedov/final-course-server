import { Schema, model } from "mongoose";

const Comments = new Schema({
  username: { type: String, required: true },
  collectionName: { type: String, required: true },
  itemId: { type: Number, unique: true },
  comments: { type: Array },
});


//   authorName: { type: String, required: true },
//   time: { type: String },
//   message: {type: String, required: true}
export default model("Comments", Comments);