const jwt = require("jsonwebtoken");
const privateKey = "saheel";

verifyToken = (req, res, next) => {
  let bearerHeader = req.headers["Authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearerHeader[1];
    jwt.verify(bearerToken.toString(), privateKey, (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Authorization" });
      } else {
        return next();
      }
    });
  }
};

module.exports = verifyToken;
