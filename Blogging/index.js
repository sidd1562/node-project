const express = require("express");
const path = require("path");
const app = express();
const UserRouter = require("./routes/user");
const PORT = 8000;

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
  console.log("mongoose connected");
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
