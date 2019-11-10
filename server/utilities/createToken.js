const jwt = require("jsonwebtoken");

const createToken = async (payload, secret, options) => {
  try {
    const token = await jwt.sign(payload, secret, options);
    return token;
  } catch (e) {
    console.error(e);
  }
};

module.exports = createToken;
