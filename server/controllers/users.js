const bcrypt = require("bcrypt");
const { Users } = require("../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const errors = {};
    // Check whether name or email address is already taken
    const userWithName = await Users.findOne({ name }).lean();
    const userWithEmail = await Users.findOne({ email }).lean();
    if (userWithName) {
      errors.name = "Name is already taken";
    }
    if (userWithEmail) {
      errors.email = "Email address is already taken";
    }
    if (Object.keys(errors).length > 0) {
      console.log("Errors", errors);
      return res.status(400).send(errors);
    }
    // Name and email address are free
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Save the user to the database
    const _ = await Users.create({
      name,
      email,
      password: hashedPassword
    });
    res.status(201).end();
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check whether user with given name exists
    const user = await Users.findOne({ name });
    // User not found
    if (!user) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    // Check whether the passwords match
    const match = await bcrypt.compare(password, user.password);
    // Passwords not match
    if (!match) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    // Passwords match
    const { _id, email } = user;
    res.send({ _id, name, email });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

module.exports = {
  register,
  login
};
