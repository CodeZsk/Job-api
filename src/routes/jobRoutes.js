const express = require("express");
const router = express.Router();

const {
    getAllJobController,
    getJobByIdController,
} = require("../controllers/jobController");

//routes
router.route("/").get(getAllJobController);
router.route("/:id").get(getJobByIdController);

module.exports = router;
