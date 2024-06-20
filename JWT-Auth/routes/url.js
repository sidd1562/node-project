const express = require("express");
const {
  handelGenerateShortURl,
  handelGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handelGenerateShortURl);
router.get('/analytics/:shortId', handelGetAnalytics);

module.exports = router;
