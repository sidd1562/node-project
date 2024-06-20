const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");
const app = express();
const PORT = 8000;

//Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//connection

mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-8000")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB not Connected", error);
  });

// HTML
app.get("/users", async (req, res) => {
  const alldbUser = await User.find({});
  const HTML = `
       <ul>
          ${alldbUser
            .map((user) => `<li> ${user.firstName} - ${user.Email} </li>`)
            .join("")}
       </ul>`;

  res.send(HTML);
});

// middleware convert body to form
app.use(express.urlencoded({ extended: false }));

// Routes
//REST API
//JSON

app.get("/api/users", async (req, res) => {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      lastName: "namechange",
    });
    return res.json({ status: "Update Success" });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Delete Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    Email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("resilt", result);

  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server start ${PORT}`);
});
