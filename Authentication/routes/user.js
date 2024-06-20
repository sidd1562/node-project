const express = require("express");
const {userSighup,userLogin} = require("../controllers/user");
const router = express.Router();

router.post("/",userSighup);
router.post("/login",userLogin);

module.exports = router;
