const fs = require("fs");
function formatDate(timestamp) {
  const now = new Date(timestamp);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function logReqRes() {
  return (req, res, next) => {
    const timestamp = Date.now();
    const formattedDate = formatDate(timestamp);
   
    fs.appendFile(
      "log.txt",
      `\n${formattedDate} -> ${req.method}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {logReqRes};