const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");
const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");
const app = express();
const PORT = 8000;
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const Blog = require("./models/blog");

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
  console.log("mongoose connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", UserRouter);
app.use("/blog", BlogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
