import express from "express";
import mongoose from "mongoose";
import mongooseTypeEmail from "mongoose-type-email";
import expressJWT from "express-jwt";
import jwt from "jsonwebtoken";
import dotEnv from "dotenv";

let router = express.Router();

//creating a DB schema = DB Structure
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: mongoose.SchemaTypes.Email, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: false },
  token: { type: String }
});

//creating a model = manipulating the DB data
let User = mongoose.model("user", userSchema);
let newUser = new User();

//Sign up
router.post("/signup", (req, res) => {
  let body = req.body;
  console.log("body: ", body);

  if (body.email && body.password) {
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.message = req.body.message;

    // saving model to mongoDB
    newUser.save(function(err) {
      console.log("user saved");
      res
        .status(200)
        .send("Welcome!! Your new account " + body.email + " is now created!");
    });
  } else if (
    (User.email = !req.body.email || User.password != req.body.password)
  ) {
    res.status(400).send({
      message: "You should provide a valid email and password"
    });
  } else if (User.email == Null) {
    res.status(404).send({
      message: "No account found with email: " + body.email
    });
  } else {
    res.status(400).send({
      message: "You should provide a valid email and password"
    });
  }
});

// login
router.post("/login", (req, res) => {
  let body = req.body;
  console.log("body:", body);

  if (body.email && body.password) {
    User.findOne({ email: body.email }, function(err, result) {
      console.log("result found:", result);
      if (body.password == body.password) {
        //generate the token
        let token = jwt.sign({ email: req.body.email }, "mysecret");
        //store token in the DB
        result.token = token;
        result.save();
        res.status(200).json({
          status: true,
          message: "Token delivered",
          token: token
        });
        console.log("here is our token:", token);
      } else {
        console.log("password not correct");
        res.status(401).send("invalid password");
      }
    });
  } else {
    console.log("the user is not in our database");
    res.status(401).send("invalid user");
  }
});

// Show the User List
router.post("/listofusers", (req, res) => {
  let body = req.body;
  if (body.email && body.password && body.token) {
    User.findOne({ email: body.email }, function(err, result) {
      console.log("result found:", result);
      if (body.password == body.password && body.token == body.token) {
        res.status(200).json({ result });
      } else {
        console.log("password or Token are not correct");
        res.status(401).send("invalid password or token");
      }
    });
  } else {
    console.log("the user is not in our database");
    res.status(401).send("invalid user");
  }
});

// Show the Users's message
router.post("/messages", (req, res) => {
  let body = req.body;
  if (body.email && body.password && body.token) {
    User.findOne({ email: body.email }, function(err, result) {
      console.log("result found:", result);
      if (body.password == body.password && body.token == body.token) {
        res.status(200).json(
          // "date: " + date,
          "message: " + body.message
        );
      } else {
        console.log("password or Token are not correct");
        res.status(401).send("invalid password or token");
      }
    });
  } else {
    console.log("the user is not in our database");
    res.status(401).send("invalid user");
  }
});

export default router;
