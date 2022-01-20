const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (token == null) {
      return res.status(401).send({
        message: "Access Denied",
      });
    } else {
      const verified = jwt.verify(token, process.env.TOKEN_KEY);

      req.user = verified;

      next();
    }
  } catch (err) {
    res.status(400).send({
      message: "Invalid Token",
    });
  }
};
