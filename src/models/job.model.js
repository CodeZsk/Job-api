const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            requied: [true, "Companay name is require"],
        },
        location: {
            type: String,
            requied: [true, "Location is require"],
        },
        department: {
            type: String,
            requied: [true, "Department name is require"],
        },
        position: {
            type: String,
            required: [true, "Job Position is required"],
            maxlength: 100,
        },
        workType: {
            type: [String],
            enum: ["Full time", "part time", "internship", "contaract"],
            required: [true, "Work Type is required"],
        },
        workMode: {
            type: [String],
            enum: ["work from home", "Work from office", "Field Job"],
            required: [true, "Work Mode is required"],
        },
        shift: {
            type: String,
            enum: ["day", "night"],
            required: [true, "Shift is required"],
        },
        minSalary: {
            type: String,
            required: [true, "MinSalary is required"],
        },
        maxSalary: {
            type: String,
            required: [true, "MaxSalary is required"],
        },
        incentives: {
            type: String,
            required: [true, "Incentives is required"],
        },

        jobDescription: {
            type: String,
            required: [true, "Job description is required"],
        },

        experience: {
            type: String,
            enum: ["Freshers", "2 Years +", "5 Years +", "10 Years +"],
        },

        englishLevel: {
            type: String,
            enum: ["Basic", "Intermediate", "High"],
            required: [true, "English Level is Required"],
        },

        educationLevel: {
            type: String,
            enum: [
                "10th or below 10th",
                "12th Pass",
                "Diploma",
                "ITI",
                "Graduate",
                "Post Graduate",
            ],
            required: [true, "Eduction Level is Required"],
        },

        interviewMode: {
            type: String,
            enum: ["In person"],
            required: [true, "Interview Mode is Required"],
        },

        interviewLocation: {
            type: String,
            required: [true, "Work location is required"],
        },

        isurgent: {
            type: Boolean,
            default: false,
        },
        ishr: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "reject", "interview"],
            default: "pending",
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Job", jobSchema);
