const Post = require("../models/postsModel");
const User = require("../models/usersModel");
const Comment = require("../models/commentsModel");
// ! Get All Posts
const getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

//! Add a new Post
const createPost = async (req, res) => {
  try {
    const { postText } = req.body;
    if (!postText) return res.status(403).send("Please add some text.");

    const { userId } = req.params;
    const username = req.user.username;
    const foundUser = await User.findById(userId);

    const postImg = req.file.filename;

    const newPost = await Post.create({
      postText,
      author: username,
      postImg,
      userId,
      userPhoto: foundUser.photo,
    });

    await foundUser.updateOne(
      {
        $push: {
          posts: newPost,
        },
      },
      { new: true }
    );
    res.status(201).send("Post Created Successfully");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//! Get Post data using _id

const getPost = async (req, res) => {
  const { id } = req.params;
  const getData = await Post.findById(id);
  res.status(200).json(getData);
};

//! Delete Post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  // console.log(post);
  post.comments.forEach(async (comment) => {
    // console.log(comment);
    const postComment = await Comment.findByIdAndDelete(comment);
    console.log(postComment);
  });
  await Post.findByIdAndDelete(id);
  res.status(200).json(post);
};

module.exports = { getPosts, createPost, getPost, deletePost };
