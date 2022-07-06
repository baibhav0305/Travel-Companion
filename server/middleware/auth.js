const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

const protected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json("Not Authorized");
    }
  }

  if (!token) {
    res.status(401).json("Not Authorized, No token found");
  }
};

module.exports = { protected };
