const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        const userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        res.send({ msg: "Plaease Login" });
      }
    } catch (error) {
      console.log(error);
      res.send({ msg: "Invaid Token" });
    }
  } else {
    res.send({ msg: "Plaese Login" });
  }
};

module.exports = {
  authentication,
};
