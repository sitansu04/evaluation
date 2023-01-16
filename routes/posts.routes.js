const express = require("express");
const { Postmodel } = require("../models/post.model.js");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query = req.query;
//   const req_userID = req.body.UserID;
  try {
    const posts = await Postmodel.find(query);
    res.send( posts );
  } catch (error) {
    console.log(error);
    res.send({ msg: error });
  }
});

postRouter.post("/posts", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new Postmodel(payload);
    await new_post.save();
    res.send({ msg: new_post });
  } catch (error) {
    console.log(error);
    res.send({ msg: error });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await Postmodel.findOne({ _id: id });
  const userID_in_post = post.userID;
  const req_userID = req.body.userID;
  try {
    if (userID_in_post !== req_userID) {
      res.send({ msg: "You are not Authorized" });
    } else {
      await Postmodel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Post updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Postmodel.findOne({ _id: id });
  const userID_in_post = post.userID;
  const req_userID = req.body.userID;
  try {
    if (userID_in_post !== req_userID) {
      res.send({ msg: "You are not Authorized" });
    } else {
      await Postmodel.findByIdAndDelete({ _id: id });
      res.send({ msg: "Post deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error });
  }
});

module.exports = {
  postRouter,
};
