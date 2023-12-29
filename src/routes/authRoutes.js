const express = require("express");

const authContoller =require("../controllers/authContoller")
// const loginController = require("../controllers/authContoller")
// router object

const router = express.Router();

// routes
router.post('/register',authContoller.registerController)


// LOGIN || POST
router.post("/login", authContoller.loginController);

module.exports=router;
