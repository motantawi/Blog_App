const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: [true, "Write something please!"],
    },
    author: {
      type: String,
    },
    postImg: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    userPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
