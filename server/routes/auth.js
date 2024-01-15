const express = require("express");
const multer = require("multer");
const { register, login, logout } = require("../controllers/authController");
const router = express.Router();

/*  FILE STORAGE  */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

router.post("/auth/register", upload.single("photo"), register);

router.post("/auth/login", login);
router.post("/logout", logout);

module.exports = router;
