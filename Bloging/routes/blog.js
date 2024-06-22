const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Blog = require("../models/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// const uploadPath = path.resolve(`./public/uploads/${req.user.filename}`);   // file image folder create and save
// fs.mkdirSync(uploadPath, { recursive: true });
// cb(null, uploadPath);
//   },

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("blogImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
