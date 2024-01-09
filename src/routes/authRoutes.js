const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/authContoller");

// routes
// router.post("/register", registerController);

// LOGIN || POST
router.post("/login", authController);

module.exports = router;
