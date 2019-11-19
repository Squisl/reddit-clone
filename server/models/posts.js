const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "users",
      required: true
    },
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "communities",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      trim: true,
      maxlength: 40000
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
    ],
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "comments"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", postsSchema);
