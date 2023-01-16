const express = require("express");
require("dotenv").config();
const { Usermodel } = require("../models/users.model.js");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Usermodel({
          name,
          email,
          gender,
          password: secure_password,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hased_pass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hased_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "LOgin Successfull", accesstoken: token });
        } else {
          res.send({ msg: "Login failed" });
        }
      });
    } else {
      res.send("wrong details");
    }
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});
module.exports = {
  userRouter,
};
