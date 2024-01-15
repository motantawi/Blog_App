const Post = require("../models/postsModel");
const Comment = require("../models/commentsModel");
const User = require("../models/usersModel");

//! Add a new comment to the post
const createComment = async (req, res) => {
  // find out which post you are commenting
  const { commentBody } = req.body;
  const { postId } = req.params;
  const username = req.user.username;
  const foundUser = await User.findById(req.user.id);
  // get the comment text and record post id
  const newComment = await Comment.create({
    commentBody,
    postId,
    username,
    userPhoto: foundUser.photo,
  });

  // get this particular post
  await Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        comments: newComment,
      },
    },
    { new: true }
  );

  res.status(201).json(newComment);
};

module.exports = { createComment };
