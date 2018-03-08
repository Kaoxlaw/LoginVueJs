"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTypeEmail = require("mongoose-type-email");

var _mongooseTypeEmail2 = _interopRequireDefault(_mongooseTypeEmail);

var _expressJwt = require("express-jwt");

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//creating a DB schema = DB Structure
var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  email: { type: _mongoose2.default.SchemaTypes.Email, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: false },
  token: { type: String }
});

//creating a model = manipulating the DB data
var User = _mongoose2.default.model("user", userSchema);
var newUser = new User();

//Sign up
router.post("/signup", function (req, res) {
  var body = req.body;
  console.log("body: ", body);

  if (body.email && body.password) {
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.message = req.body.message;

    // saving model to mongoDB
    newUser.save(function (err) {
      console.log("user saved");
      res.status(200).send("Welcome!! Your new account " + body.email + " is now created!");
    });
  } else if (User.email = !req.body.email || User.password != req.body.password) {
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
router.post("/login", function (req, res) {
  var body = req.body;
  console.log("body:", body);

  if (body.email && body.password) {
    User.findOne({ email: body.email }, function (err, result) {
      console.log("result found:", result);
      if (body.password == body.password) {
        //generate the token
        var token = _jsonwebtoken2.default.sign({ email: req.body.email }, "mysecret");
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
router.post("/listofusers", function (req, res) {
  var body = req.body;
  if (body.email && body.password && body.token) {
    User.findOne({ email: body.email }, function (err, result) {
      console.log("result found:", result);
      if (body.password == body.password && body.token == body.token) {
        res.status(200).json({ result: result });
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
router.post("/messages", function (req, res) {
  var body = req.body;
  if (body.email && body.password && body.token) {
    User.findOne({ email: body.email }, function (err, result) {
      console.log("result found:", result);
      if (body.password == body.password && body.token == body.token) {
        res.status(200).json(
        // "date: " + date,
        "message: " + body.message);
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

exports.default = router;