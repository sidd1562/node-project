const express = require("express");
const { connnectedtoMongooseDB } = require("./connected");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 5000;

connnectedtoMongooseDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("monogoose db conntect to your project");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);
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
