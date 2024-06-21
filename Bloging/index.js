const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiePaser = require("cookie-parser");
const UserRouter = require("./routes/user");
const app = express();
const PORT = 8000;
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
  console.log("mongoose connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
