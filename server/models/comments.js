const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    parentComment: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "comments"
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      requird: true
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "posts",
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000
    },
    votes: [
      {
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        vote: {
          type: Number,
          enum: [1, -1],
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", commentsSchema);
