const jobsModel = require("../models/job.model");

const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};
const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  //conditons for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  //logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //jobs count
  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};

const deleteJobController = async (req, res, next) => {
    const { id } = req.params;
    //find job
    const job = await jobsModel.findOne({ _id: id });
    //validation
    if (!job) {
      next(`No Job Found With This ID ${id}`);
    }
    if (!req.user.userId === job.createdBy) {
      next("Your Not Authorize to delete this job");
      return;
    }
    await job.deleteOne();
    res.status(200).json({ message: "Success, Job Deleted!" });
  };

module.exports = { createJobController,getAllJobsController,deleteJobController };
