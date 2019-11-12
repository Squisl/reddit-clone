const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const createToken = require("../utilities/createToken");

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
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword
    });

    const emailToken = await createToken(
      { user_id: newUser._id },
      process.env.EMAIL_SECRET,
      process.env.EMAIL_EXPIRATION
    );

    const confirmation_url = `http://localhost:3000/confirm/${emailToken}`;

    // TODO: Send confirmation link to the email address
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL, // generated ethereal user
        pass: process.env.NODEMAILER_PASSWORD // generated ethereal password
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "admin", // sender address
      to: email, // list of receivers
      subject: "Confirm Email", // Subject line
      html: `Please click this link to confirm your email address: <a href=${confirmation_url} target="_blank">${confirmation_url}</a>` // html body
    });

    res.status(201).send({
      msg: "Successfully created. Please confirm your email address."
    });
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
    const { _id, email, tokenVersion } = user;
    // Create refresh token
    const refreshToken = await createToken(
      { _id, tokenVersion },
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRATION
    );
    // Save refresh token in a cookie
    res.cookie("jwt", refreshToken, {
      maxAge: parseInt(process.env.REFRESH_EXPIRATION),
      httpOnly: true,
      sameSite: true,
      secure: false
    });
    // Create access token
    const accessToken = await createToken(
      { _id, tokenVersion },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_EXPIRATION
    );
    res.send({
      token: accessToken,
      user: { _id, name, email }
    });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

const logout = (_, res) => {
  res.clearCookie("jwt");
  res.send({ msg: "successfully logout" });
};

const refresh_token = async (req, res) => {
  const token = req.cookies.jwt;
  console.log("Cookie token", token);
  if (!token) {
    return res.status(401).send({ token: "Token not found" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.REFRESH_SECRET);
    console.log("Decoded", decoded);
    if (!decoded) {
      return res.status(401).send({ token: "Invalid token" });
    }
    const fetchedUser = await Users.findById(decoded._id);
    const { _id, tokenVersion } = fetchedUser;
    const accessToken = await createToken(
      { _id, tokenVersion },
      process.env.ACCESS_SECRET,
      process.env.ACCESS_EXPIRATION
    );
    res.send({ token: accessToken });
  } catch (e) {
    console.error(e);
  }
};

const reload = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ token: "Token not found" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_SECRET);
    if (!decoded) {
      return res.status(401).send({ token: "Invalid token" });
    }
    const fetchedUser = await Users.findById(decoded._id);
    const { _id, email, name } = fetchedUser;
    res.send({ _id, email, name });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  register,
  login,
  logout,
  refresh_token,
  reload
};
