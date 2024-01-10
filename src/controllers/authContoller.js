const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

function authController(req, res) {
    const phone = req.body.phoneNo;

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
        throw new BadRequestError("Invalid phone number");
    }

    // Check if the phone number exists in the database
    Auth.findOne({ phone: phone })
        .then((existingUser) => {
            if (existingUser) {
                // Phone number already exists, generate JWT token
                const token = generateToken(existingUser._id);
                res.status(StatusCodes.OK).json({
                    success: true,
                    msg: "Login Successfully",
                    isNew: false,
                    token: token,
                });
            } else {
                // Phone number doesn't exist, create a new record and generate JWT token
                Auth.create({ phone: phone })
                    .then((newData) => {
                        const token = generateToken(newData._id);
                        res.status(StatusCodes.OK).json({
                            success: true,
                            msg: "Successful",
                            isNew: true,
                            token: token,
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            success: false,
                            msg: "Error occurred during creation",
                        });
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred during phone number check",
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

module.exports = { authController };
