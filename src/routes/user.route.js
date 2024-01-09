const express = require("express");
const router = express.Router();

//routes

const {
    createUserController,
    getUserByIdController,
    updateUserController,
} = require("../controllers/user.controller");

//routes
router.route("/").post(createUserController).patch(updateUserController);
router.route("/:id").get(getUserByIdController);

module.exports = router;
