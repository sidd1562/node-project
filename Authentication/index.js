const express = require("express");
const { connnectedtoMongooseDB } = require("./connected");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8000;
const cookiePareser = require("cookie-parser");
const userRouter = require("./routes/user");
const {restricLoginUserOnly,checkAuth} = require('./middlewares/auth')
connnectedtoMongooseDB("mongodb://127.0.0.1:27017/Auth").then(() => {
  console.log("monogoose db conntect to your project");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePareser());



app.use("/url", restricLoginUserOnly,urlRoute);
app.use("/user", userRouter);
app.use("/", checkAuth,staticRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
});

app.delete("/delete/:shortId", async (req, res) => {
  await URL.findOneAndDelete(req.params.shortId);
  return res.json({ status: "Delete Success" });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
