const express = require("express");
const multer = require("multer");
const {
  getPosts,
  createPost,
  getPost,
  deletePost,
} = require("../controllers/postsController");
const router = express.Router();

/*  FILE STORAGE  */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/posts");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });
router.route("/posts").get(getPosts);

router.post("/:userId/posts", upload.single("postImg"), createPost);

router.route("/posts/:id").get(getPost);
router.route("/posts/:id/delete").delete(deletePost);

module.exports = router;
