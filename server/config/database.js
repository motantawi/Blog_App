const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "mern_project" })
    .then(() => {
      console.log(`Connected to DB`);
    })
    .catch((err) => console.log(`Database Error: ${err}`));
};

module.exports = dbConnection;
