const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    commentBody: {
      type: String,
      trim: true,
      required: true,
    },
    // each comment can only relates to one blog, so it's not in array
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    username: {
      type: String,
    },
    userPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
