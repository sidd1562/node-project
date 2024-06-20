const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenerateShortURl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url us required" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortId });
  //   return res.json({ id: shortId });
}

async function handelGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totatlClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handelGenerateShortURl,
  handelGetAnalytics,
};
