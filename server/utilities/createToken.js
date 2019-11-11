const jwt = require("jsonwebtoken");

const createToken = async (payload, secret, expiration) => {
  try {
    const token = await jwt.sign(payload, secret, { expiresIn: expiration });
    return token;
  } catch (e) {
    console.error(e);
  }
};

module.exports = createToken;
