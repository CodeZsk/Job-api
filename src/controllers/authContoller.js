const userModel  =require("../models/user.model")
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate
    if (!name) {
      next("name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required and greater than 6 character");
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      next("Email Already Register Please Login");
    }
    const user = await userModel.create({ name, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
      sucess: true,
      message: "User Created Successfully",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error In Regristration",
      success: false,
      error,
    });
  }
};
module.exports = registerController;
