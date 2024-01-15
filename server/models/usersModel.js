const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 10,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      max: 10,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 2,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    photo: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
