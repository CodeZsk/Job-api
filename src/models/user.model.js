const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const JWT = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            unique: true,
            required: [true, "Phone Nummber Is Require"],
        },
        name: {
            type: String,
            required: [true, "Name Is Require"],
        },
        email: {
            type: String,
            validate: validator.isEmail,
        },
        dob: {
            type: String,
            required: [true, "Date of Birth is Required"],
        },
        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: [true, "Gender is Required"],
        },
        education: {
            type: String,
            enum: [
                "10th or below 10th",
                "12th Pass",
                "Diploma",
                "ITI",
                "Graduate",
                "Post Graduate",
            ],
            required: [true, "Education is Required"],
        },
        degree: {
            type: String,
            required: [
                function () {
                    return [
                        "Diploma",
                        "ITI",
                        "Graduate",
                        "Post Graduate",
                    ].includes(this.education);
                },
                "Degree is Required",
            ],
        },
        isExperience: {
            type: Boolean,
            required: [true, "Exprerience is Required"],
        },
        yearExperience: {
            type: String,
            required: [
                function () {
                    return this.isExperience;
                },
                "Year is Required",
            ],
        },
        monthsExperience: {
            type: String,
            required: false,
        },
        skills: {
            type: [String], // Array of strings
            validate: {
                validator: function (value) {
                    return value.length >= 4; // Minimum 4 skills required
                },
                message: "Minimum 4 skills are required",
            },
        },
        engsplvl: {
            type: String,
        },
        languages: {
            type: [String],
        },
        empType: {
            type: [String],
        },
        empWorkPlace: {
            type: [String],
        },
        empShift: {
            type: [String],
        },
        city: {
            type: [String],
        },
        jobs: {
            type: [String],
        },
    },
    { timestamps: true }
);
// // middelwares
// userSchema.pre("save", async function () {
//     if (!this.isModified) return;
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// //compare password
// userSchema.methods.comparePassword = async function (userPassword) {
//     const isMatch = await bcrypt.compare(userPassword, this.password);
//     return isMatch;
// };

// //JSON WEBTOKEN
// userSchema.methods.createJWT = function () {
//     return JWT.sign({ userId: this._id }, process.env.JWT_KEY, {
//         expiresIn: "1d",
//     });
// };
// module.createJWT = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
