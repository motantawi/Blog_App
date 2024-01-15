const express = require("express");
const { createComment } = require("../controllers/commentsController");
const Comment = require("../models/commentsModel");

const router = express.Router();

router
  .route("/:postId/comments")
  .post(createComment)
  .get(async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find(Comment.where({ postId: postId }));
    res.status(200).json(comments);
  });

module.exports = router;
