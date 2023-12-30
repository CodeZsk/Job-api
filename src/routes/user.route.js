const express = require("express");
const router = express.Router();

const updateUserController = require("../controllers/user.controller");

const authenticationMiddleware = require("../middlewares/auth.middleware");

const { hello } = require("../controllers/user.controller");

router.route("/").get(hello);

//routes
// GET USERS || GET

// UPDATE USER || PUT
router.put(
  "/update-user",
  authenticationMiddleware,
  updateUserController.updateUserController
);

module.exports = router;
