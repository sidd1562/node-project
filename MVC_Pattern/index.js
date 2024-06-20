const express = require("express");
const { connectionMongoDB } = require("./connection");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");
const app = express();
const PORT = 8000;


app.use(logReqRes("log.txt"));

//connection
connectionMongoDB("mongodb://127.0.0.1:27017/youtube-8000").then(()=>{console.log("MongoDb Connected")}).catch((err)=>{console.log("Error MongoDb ",err);});

// middleware convert body to form
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users",userRouter);

//PORT 
app.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});
