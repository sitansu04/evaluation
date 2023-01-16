const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title:String,
    body:String,
    device:String
  },
  {
    versionKey: false,
  }
);

const Postmodel = mongoose.model("Post", postSchema);
module.exports = {
  Postmodel,
};