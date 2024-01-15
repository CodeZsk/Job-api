const express = require("express");
const router = express.Router();

const {
    signInContorller,
    signUpController,
} = require("../controllers/authContoller");

// routes
// router.post("/register", registerController);

// LOGIN || POST
router.post("/signin", signInContorller);
router.post("/signup", signUpController);

module.exports = router;
