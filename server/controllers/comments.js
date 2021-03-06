const { Comments, Posts } = require("../models");

const create = async (req, res) => {
  const { post_id, text } = req.body;
  const newComment = await Comments.create({
    user: req.user._id,
    post: post_id,
    text
  });
  const populatedComment = await newComment
    .populate("user", "_id name")
    .execPopulate();
  await Posts.update({ _id: post_id }, { $push: { comments: newComment._id } });
  res.status(201).send(populatedComment);
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

const upvote = async (req, res) => {
  const { comment_id } = req.params;
  try {
    // Check whether comment with the id exists
    const comment = await Comments.findById(comment_id);
    // If the comment was not found return error message
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    // If we found a comment
    // Check whether user already voted for the comment
    const match = comment.votes.find(
      vote =>
        vote.user_id === req.user._id.toString() && vote.name === req.user.name
    );
    // If no vote was found, create a new upvote
    if (!match) {
      const updatedComment = await Comments.findByIdAndUpdate(
        comment_id,
        {
          $push: {
            votes: { user_id: req.user._id, name: req.user.name, vote: 1 }
          }
        },
        { new: true }
      ).populate("user", "_id name");
      return res.status(201).send(updatedComment);
    } else {
      if (match.vote === 1) {
        // If the user already upvoted the comment, delete the vote
        const updatedComment = await Comments.findByIdAndUpdate(
          comment_id,
          {
            $pull: {
              votes: { user_id: req.user._id, name: req.user.name }
            }
          },
          { new: true }
        ).populate("user", "_id name");
        return res.send(updatedComment);
      } else {
        // If the user already downvoted the comment, change it to an upvote
        const updatedComment = await Comments.findOneAndUpdate(
          { _id: comment_id, "votes.user_id": req.user._id },
          { $set: { "votes.$.vote": 1 } },
          { new: true }
        ).populate("user", "_id name");
        return res.send(updatedComment);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const downvote = async (req, res) => {
  const { comment_id } = req.params;
  try {
    // Check whether the comment with the id exists
    const comment = await Comments.findById(comment_id);
    // If the comment was not found, return error messasge
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    // Check whether the user already voted for the comment
    const match = comment.votes.find(
      vote =>
        vote.user_id === req.user._id.toString() && vote.name === req.user.name
    );
    // If no vote was found, create new upvote
    if (!match) {
      const updatedComment = await Comments.findByIdAndUpdate(
        comment_id,
        {
          $push: {
            votes: { user_id: req.user._id, name: req.user.name, vote: -1 }
          }
        },
        { new: true }
      ).populate("user", "_id, name");
      return res.status(201).send(updatedComment);
    } else {
      if (match.vote === -1) {
        // If the vote is an downvote, delete it
        const updatedComment = await Comments.findByIdAndUpdate(
          comment_id,
          { $pull: { votes: { user_id: req.user._id, name: req.user.name } } },
          { new: true }
        ).populate("user", "_id, name");
        return res.send(updatedComment);
      } else {
        // If the vote is an upvote, change it to an downvote
        const updatedComment = await Comments.findOneAndUpdate(
          { _id: comment_id, "votes.user_id": req.user._id },
          { $set: { "votes.$.vote": -1 } },
          { new: true }
        ).populate("user", "_id, name");
        return res.send(updatedComment);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const reply = async (req, res) => {
  const { comment_id } = req.params;
  const { post_id, text } = req.body;
  try {
    // Check whether the comment we reply to exists
    const parentComment = await Comments.findById(comment_id);
    // If the comment was not found, return with an error response
    if (!parentComment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    // If the comment exists, create a new comment reply
    const commentReply = await Comments.create({
      parentComment: comment_id,
      post: post_id,
      user: req.user._id,
      text
    });
    const populatedReply = await commentReply
      .populate("user", "_id name")
      .execPopulate();
    res.status(201).send(populatedReply);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getByPost,
  upvote,
  downvote,
  reply
};
