import express from "express";
import router from "./routes/sign";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import mongooseTypeEmail from "mongoose-type-email";
import expressJWT from "express-jwt";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

dotEnv.config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  expressJWT({ secret: process.env.SECRETKEY }).unless({
    path: ["/signup", "/login", "/listofusers", "/messages"]
  })
);

app.use("/", router);

//Mongoose DB Connection
mongoose.connect("mongodb://localhost:27017/api_jwt_db", function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Mongoose database is connected");
  }
});

app.listen("8080", () => {
  console.log("App listen on port 8080!!");
});
