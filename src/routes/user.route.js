const express = require("express");
const router = express.Router();

const { hello } = require("../controllers/user.controller");

router.route("/").get(hello);

module.exports = router;
