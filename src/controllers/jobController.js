const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job.model");

function getAllJobController(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {};
    if (req.query.department) {
        filters.department = req.query.department;
    }
    if (req.query.salary) {
        filters.minSalary = { $gte: req.query.salary };
    }
    if (req.query.workType) {
        filters.workType = req.query.workType;
    }
    if (req.query.shift) {
        filters.shift = req.query.shift;
    }
    if (req.query.jobDescription) {
        filters.jobDescription = req.query.jobDescription;
    }
    if (req.query.status) {
        filters.status = req.query.status;
    }

    const sortOptions = {};
    if (req.query.sortBy) {
        sortOptions[req.query.sortBy] = 1; // 1 for ascending order, -1 for descending
    }

    Job.find(filters)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .then((jobs) => {
            return Job.countDocuments(filters).then((totalJobs) => {
                const totalPages = Math.ceil(totalJobs / limit);

                res.status(StatusCodes.OK).json({
                    success: true,
                    msg: "Successful",
                    data: jobs,
                    totalJobs,
                    totalPages,
                    currentPage: page,
                });
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred",
            });
        });
}

function getJobByIdController(req, res) {
    const jobId = req.params.id;

    Job.findById(jobId)
        .then((job) => {
            if (!job) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    msg: "Job not found",
                });
            }

            res.status(StatusCodes.OK).json({
                success: true,
                msg: "Successful",
                data: job,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred",
            });
        });
}

module.exports = {
    getAllJobController,
    getJobByIdController,
};
