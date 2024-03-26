const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

//!----> REGISTER USER
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(403).send("All fields are required");

    const photo = req.file.filename;

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      photo,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//!----> USER Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ... existing code ...
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate a JWT token
    const accessToken = jwt.sign(
      { id: user._id, username: `${user.firstName} ${user.lastName}` },
      process.env.ACCESS_TOKEN_SECRET
    );

    // res.cookie("accessToken", token, {
    //   httpOnly: true,
    //   // secure: true, // Uncomment this line in production for HTTPS
    // });

    res.status(200).json({ user: { accessToken, ...user._doc } });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

//! User logout
const logout = (req, res) => {
  // Clear the access token cookie
  res.clearCookie("accessToken");

  res.status(200).json({ message: "Logout successful" });
};

module.exports = { register, login, logout };
