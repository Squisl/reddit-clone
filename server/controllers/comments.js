const { Comments, Posts } = require("../models");

const create = async (req, res) => {
  const { post_id, text } = req.body;
  const newComment = await Comments.create({
    user: req.user._id,
    post: post_id,
    text
  });
  await Posts.update({ _id: post_id }, { $push: { comments: newComment._id } });
  res.status(201).send(newComment);
};

const getByPost = async (req, res) => {
  try {
    const comments = await Comments.find({ post: req.params.post_id }).populate(
      "user",
      "_id name"
    );
    res.send(comments);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getByPost
};
