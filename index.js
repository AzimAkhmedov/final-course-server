import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import {
  AuthRouter,
  ItemRouter,
  ThemeRouter,
  collectionRouter,
  AdminRouter,
} from "./routes/index.js";
import cors from "cors";
import { Img, SearchController } from "./controllers/index.js";

const app = express();
const PORT = process.env.PORT || 5000;
const db =
  "mongodb+srv://azahqwerty:j6xlEOKcaI5GzB36@cluster0.292rjwk.mongodb.net/?retryWrites=true&w=majority";
app.use(cors());
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/auth", AuthRouter);
app.use("/collection", collectionRouter);
app.use("/items", ItemRouter);
app.use("/theme", ThemeRouter);
app.use("/admin", AdminRouter);
app.get("/search/:searchparam", SearchController.search);
app.use("/upload", Img);
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
