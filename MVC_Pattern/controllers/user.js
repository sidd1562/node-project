const User = require("../models/user");

async function handleAllUser(req, res) {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
}

async function handlegetUserByID(req, res) {
  const user = await User.findById(req.params.id);

  return res.json(user);
}
async function handlegetUpdateUserByID(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    lastName: "namechange",
  });
  return res.json({ status: "Update Success" });
}

async function handlegetDeteleUserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Delete Success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    Email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("resilt", result);

  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
  handleAllUser,
  handlegetUserByID,
  handlegetUpdateUserByID,
  handlegetDeteleUserByID,
  handleCreateNewUser,
};
