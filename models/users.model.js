const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const Usermodel = mongoose.model("User", userSchema);
module.exports = {
  Usermodel,
};
