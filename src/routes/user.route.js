const express = require("express");
const router = express.Router();

//routes

const {
    getAllUserController,
    getUserController,
    updateUserController,
    getUserByNameController,
} = require("../controllers/user.controller");

//routes
router.route("/").get(getUserController).patch(updateUserController);
router.route("/connect").get(getAllUserController);
router.route("/search").get(getUserByNameController);

module.exports = router;
