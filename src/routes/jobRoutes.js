const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middlewares/auth.middleware");
const JobController=require("../controllers/jobController")

//routes
// CREATE JOB || POST
router.post("/create-job", authenticationMiddleware, JobController.createJobController);

router.get("/get-job", authenticationMiddleware, JobController.getAllJobsController);

router.delete("/delete-job/:id", authenticationMiddleware, JobController.deleteJobController
);

module.exports = router;
