require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dbConnection = require("./config/database");
const { validateToken } = require("./middlewares/authMiddleware");
//! Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "public/posts")));

// ! Database Connection
dbConnection();

// !Routes
app.use(require("./routes/auth"));
app.use(validateToken);
app.use(require("./routes/postRoutes"));
app.use("/posts", require("./routes/commentRoutes"));

app.listen(3001, () => console.log("Server listening on port 3001"));
