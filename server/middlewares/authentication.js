const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  // Extract token from the request header
  const token = req.header("Authorization");
  // No token found
  if (!token) {
    return res.status(401).send({ msg: "Invalid token" });
  }
  try {
    // Verify the token
    const decoded = await jwt.verify(token, process.env.ACCESS_SECRET);
    // Faild the verification
    if (!decoded) {
      return res.status(401).send({ msg: "Invalid token" });
    }
    // Assign the token payload to the 'user' property of the request
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
};

module.exports = {
  protect
};
