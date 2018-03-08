"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _sign = require("./routes/sign");

var _sign2 = _interopRequireDefault(_sign);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

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

_dotenv2.default.config();
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use((0, _expressJwt2.default)({ secret: process.env.SECRETKEY }).unless({
  path: ["/signup", "/login", "/listofusers", "/messages"]
}));

app.use("/", _sign2.default);

//Mongoose DB Connection
_mongoose2.default.connect("mongodb://localhost:27017/api_jwt_db", function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Mongoose database is connected");
  }
});

app.listen("8080", function () {
  console.log("App listen on port 8080!!");
});