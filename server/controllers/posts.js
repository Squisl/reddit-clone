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
    const upvotedPost = await Posts.update(
      { _id: post_id },
      { $push: { votes: upvote } }
    );
    res.send(upvotedPost);
  } else {
    console.log("MATCH", match);
    // If the vote is an upvote, delete it from the post
    if (match.vote === 1) {
      await Posts.update(
        // select your doc in moongo
        { _id: post_id }, // your query, usually match by _id
        { $pull: { votes: { user_id: _id.toString(), name } } }, // item(s) to match from array you want to pull/remove
        { multi: true } // set this to true if you want to remove multiple elements.
      );
      res.end();
    } else {
      await Posts.update(
        { _id: post_id, "votes.user_id": _id },
        { $set: { "votes.$.vote": -1 } }
      );
      res.end();
    }
  }
};

module.exports = {
  getAll,
  getByCommunity,
  create,
  upvote
};
