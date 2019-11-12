const { Schema, model } = require("mongoose");

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    tokenVersion: {
      type: Number,
      default: 0
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = model("users", usersSchema);
