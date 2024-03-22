const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.sendStatus(403);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded;
    next();
  });
};

module.exports = { validateToken };
