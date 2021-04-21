const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const Token = req.cookies.jwtoken;
    console.log(Token);
    const verifyToken = jwt.verify(Token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": Token,
    });
    if (!rootUser) {
      throw new Error("user not found");
    }

    req.Token = Token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(404).json({ Error: "Sorry Unathorisiod" });
  }
};

module.exports = authenticate;