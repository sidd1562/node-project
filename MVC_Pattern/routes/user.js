const express = require("express");
const router = express.Router();
const {
  handleAllUser,
  handlegetUserByID,
  handlegetUpdateUserByID,
  handlegetDeteleUserByID,
  handleCreateNewUser,
} = require("../controllers/user");

router.route("/").get(handleAllUser).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handlegetUserByID)
  .patch(handlegetUpdateUserByID)
  .delete(handlegetDeteleUserByID);

module.exports = router;
