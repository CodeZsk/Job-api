// model
const userModel = require("../models/user.model");
// module
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

// error
const {
  BadRequestError,
  NotFound,
  UnauthenticatedError,
} = require("../errors");

const hello = async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Successful",
    data: "hello world! it's working",
    nbHits: data.length,
  });
};

const updateUserController = async (req, res, next) => {
  let { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const User = await userModel.findOne({ _id: req.user._id });
  console.log(name);
  name = User?.name;
  lastName = User?.lastName;
  email = User?.email;
  location = User?.location;

  await User?.save();
  const token = User?.createJWT();
  res.status(200).json({
    User,
    token,
  });
};

module.exports = {
  hello,
  updateUserController,
};
