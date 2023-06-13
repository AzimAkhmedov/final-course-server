import express from "express";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 5000;
const db =
  "mongodb+srv://azahqwerty:j6xlEOKcaI5GzB36@cluster0.292rjwk.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use("/auth", AuthRouter);
const Start = async () => {
  try {
    await mongoose.connect(db);
    app.listen(PORT, () => {
      console.log("Server is working");
    });
  } catch (error) {
    console.log(error);
  }
};

Start();
