const { Posts } = require("../models");

const getAll = async (_, res) => {
  const allPosts = await Posts.find()
    .populate("community", "_id name")
    .populate("user", "_id name");
  res.send(allPosts);
};

const getByCommunity = async (req, res) => {
  try {
    const communityPosts = await Posts.find({
      community: req.params.community_id
    })
      .populate("community", "_id name")
      .populate("user", "_id name");
    res.send(communityPosts);
  } catch (e) {
    console.error(e);
  }
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
  getByCommunity,
  create
};
