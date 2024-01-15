const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

function signInContorller(req, res) {
    const phone = req.body.phoneNo;

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
        throw new BadRequestError("Invalid phone number");
    }

    // Check if the phone number exists in the database
    User.findOne({ phone: phone })
        .then((existingUser) => {
            console.log("Useer: ", existingUser);
            if (!existingUser) {
                return res.status(StatusCodes.OK).json({
                    success: false,
                    msg: "New User",
                    token: false,
                });
            }
            // Phone number already exists, generate JWT token
            const token = generateToken(existingUser._id);
            return res.status(StatusCodes.OK).json({
                success: true,
                msg: "Login Successfully",
                token: token,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred during phone number check",
            });
        });
}

function signUpController(req, res) {
    const {
        phone,
        name,
        email,
        dob,
        gender,
        education,
        degree,
        isExperience,
        yearExperience,
        monthsExperience,
        skills,
    } = req.body;

    // Check if the phone number already exists
    User.findOne({ phone: phone })
        .then((existingUser) => {
            if (existingUser) {
                // Phone number already exists
                res.status(StatusCodes.CONFLICT).json({
                    success: false,
                    msg: "Phone number already exists",
                });
            } else {
                // Phone number doesn't exist, create a new user
                const newUser = new User({
                    phone,
                    name,
                    email,
                    dob,
                    gender,
                    education,
                    degree,
                    isExperience,
                    yearExperience,
                    monthsExperience,
                    skills,
                });

                newUser
                    .save()
                    .then((user) => {
                        const token = generateToken(existingUser._id);
                        res.status(StatusCodes.CREATED).json({
                            success: true,
                            msg: "User created successfully",
                            data: user,
                            token: token,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            success: false,
                            msg: "Error occurred while creating user",
                        });
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred while checking phone number",
            });
        });
}

function generateToken(userId) {
    // Generate a JWT token with the user ID
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
}

function isValidPhoneNumber(phone) {
    // Simple validation: Ensure that the phone number is numeric and has a certain length
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

module.exports = { signInContorller, signUpController };
