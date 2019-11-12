const mongoose = require("mongoose");

const communitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("communities", communitiesSchema);
