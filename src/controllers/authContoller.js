const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

async function signInContorller(req, res) {
    try {
        const phone = req.body.phoneNo;

        // Validate phone number
        // if (!isValidPhoneNumber(phone)) {
        //     throw new BadRequestError("Invalid phone number");
        // }

        // Check if the phone number exists in the database
        const existingUser = await User.findOne({ phone });
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
    } catch (error) {
        console.error("Error occurred during sign-in:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Error occurred during sign-in" });
    }
}

async function signUpController(req, res) {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ errors: errors.array() });
        }

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
            engsplvl,
            languages,
            empType,
            empWorkPlace,
            empShift,
            city,
            jobs,
        } = req.body;

        console.log(req.body);

        // Check if the phone number already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({ success: false, msg: "Phone number already exists" });
        }

        // Create a new user
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
            engsplvl,
            languages,
            empType,
            empWorkPlace,
            empShift,
            city,
            jobs,
        });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser._id);

        // Send success response
        return res.status(StatusCodes.CREATED).json({
            success: true,
            msg: "User created successfully",
            data: newUser,
            token,
        });
    } catch (error) {
        console.error("Error occurred while signing up:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, msg: "Error occurred while signing up" });
    }
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
