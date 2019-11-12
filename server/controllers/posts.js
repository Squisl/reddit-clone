const { Posts } = require("../models");

const getAll = async (_, res) => {
  const allPosts = await Posts.find();
  res.send(allPosts);
};

const create = async (req, res) => {
  const { title, text, community_id } = req.body;
  const newPost = await Posts.create({
    community: community_id,
    user: req.user._id,
    title,
    text
  });
  res.status(201).send(newPost);
};

module.exports = {
  getAll,
  create
};
