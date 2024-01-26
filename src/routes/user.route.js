const express = require("express");
const router = express.Router();

//routes

const {
    getUserController,
    updateUserController,
} = require("../controllers/user.controller");

//routes
router.route("/").get(getUserController).patch(updateUserController);

module.exports = router;
