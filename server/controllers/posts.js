const { Posts, Communities } = require("../models");

const getAll = async (_, res) => {
  const allPosts = await Posts.find()
    .populate("community", "_id name")
    .populate("user", "_id name");
  res.send(allPosts);
};

const getByCommunity = async (req, res) => {
  try {
    // Get the community by name
    const community = await Communities.findOne({
      name: req.params.community_name
    });
    if (!community) {
      return res.status(404).send({ msg: "Community not found" });
    }
    const communityPosts = await Posts.find({
      community: community._id
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

const upvote = async (req, res) => {
  const { post_id } = req.params;
  const { _id, name } = req.user;
  const selectedPost = await Posts.findById(post_id);
  const { votes } = selectedPost;
  // Check whether user already voted for the post
  const match = votes.find(
    vote => vote.user_id === _id.toString() && vote.name === name
  );
  // If no vote was found
  if (!match) {
    const upvote = { user_id: _id, name, vote: 1 };
    // Insert new upvote
    const upvotedPost = await Posts.findByIdAndUpdate(
      post_id,
      {
        $push: { votes: upvote }
      },
      { new: true }
    )
      .populate("community", "_id name")
      .populate("user", "_id name");
    res.send(upvotedPost);
  } else {
    // If the vote is an upvote, delete it from the post
    if (match.vote === 1) {
      const updatedPost = await Posts.findByIdAndUpdate(
        post_id,
        { $pull: { votes: { user_id: _id.toString(), name } } },
        { new: true }
      )
        .populate("community", "_id name")
        .populate("user", "_id name");
      res.send(updatedPost);
    } else {
      const updatedPost = await Posts.findOneAndUpdate(
        { _id: post_id, "votes.user_id": _id },
        { $set: { "votes.$.vote": 1 } },
        { new: true }
      )
        .populate("community", "_id name")
        .populate("user", "_id name");
      console.log("Updated Post", updatedPost);
      res.send(updatedPost);
    }
  }
};

const downvote = async (req, res) => {
  const { post_id } = req.params;
  const { _id, name } = req.user;
  const selectedPost = await Posts.findById(post_id);
  const { votes } = selectedPost;
  // Check whether user already voted for the post
  const match = votes.find(
    vote => vote.user_id === _id.toString() && vote.name === name
  );
  // If no vote was found
  if (!match) {
    const downvote = { user_id: _id, name, vote: -1 };
    // Insert new upvote
    const downvotedPost = await Posts.findByIdAndUpdate(
      post_id,
      {
        $push: { votes: downvote }
      },
      { new: true }
    )
      .populate("community", "_id name")
      .populate("user", "_id name");
    res.send(downvotedPost);
  } else {
    // If the vote is an downvote, delete it from the post
    if (match.vote === -1) {
      const updatedPost = await Posts.findByIdAndUpdate(
        post_id,
        { $pull: { votes: { user_id: _id.toString(), name } } },
        { new: true }
      )
        .populate("community", "_id name")
        .populate("user", "_id name");
      res.send(updatedPost);
    } else {
      const updatedPost = await Posts.findOneAndUpdate(
        { _id: post_id, votes: { $elemMatch: { user_id: _id.toString() } } },
        { $set: { "votes.$.vote": -1 } },
        { new: true }
      )
        .populate("community", "_id name")
        .populate("user", "_id name");
      res.send(updatedPost);
    }
  }
};

const getById = async (req, res) => {
  const post = await Posts.findById(req.params.post_id)
    .populate("user", "_id name")
    .populate("community", "_id name");
  res.send(post);
};

module.exports = {
  getAll,
  getByCommunity,
  create,
  upvote,
  downvote,
  getById
};
