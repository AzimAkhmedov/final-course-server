import { Schema, model } from "mongoose";

const Comments = new Schema({
  username: { type: String,  },
  collectionName: { type: String,  },
  itemId: { type: String, },
  authorName: { type: String },
  comment: { type: String },
  time: { type: String },
});

//   authorName: { type: String, required: true },
//   time: { type: String },
//   message: {type: String, required: true}
export default model("Comments", Comments);
