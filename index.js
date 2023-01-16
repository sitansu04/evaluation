const express = require("express");
const { connection } = require("./config/db.js");
const { userRouter } = require("./routes/users.routes.js");
const {authentication}=require("./middleware/authorization.middleware.js");
const { postRouter } = require("./routes/posts.routes.js");
const cors=require("cors")
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(authentication)
app.use("/posts",postRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("err in connection");
    console.log(error);
  }
});
