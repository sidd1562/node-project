const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connnectedtoMongooseDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connnectedtoMongooseDB,
};
