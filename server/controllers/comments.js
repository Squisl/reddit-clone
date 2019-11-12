const { Comments } = require("../models");

const create = async (req, res) => {
  const { post_id, text } = req.body;
  const newComment = await Comments.create({
    user: req.user._id,
    post: post_id,
    text
  });
  res.status(201).send(newComment);
};

module.exports = {
  create
};
