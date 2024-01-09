// model
const userModel = require("../models/user.model");
// module
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

// error
const {
    BadRequestError,
    NotFound,
    UnauthenticatedError,
} = require("../errors");

function createUserController(req, res) {
    const {
        userId,
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

    const newUser = new User({
        userId,
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
            res.status(StatusCodes.CREATED).json({
                success: true,
                msg: "User created successfully",
                data: user,
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

function getUserByIdController(req, res) {
    const userId = req.params.id; // Assuming the user ID is part of the request parameters

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    msg: "User not found",
                });
            }

            res.status(StatusCodes.OK).json({
                success: true,
                msg: "User retrieved successfully",
                data: user,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred while retrieving user",
            });
        });
}

function updateUserController(req, res) {
    const userId = req.params.id;

    const {
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

    User.findByIdAndUpdate(
        userId,
        {
            $set: {
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
            },
        },
        { new: true, runValidators: true }
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    msg: "User not found",
                });
            }

            res.status(StatusCodes.OK).json({
                success: true,
                msg: "User updated successfully",
                data: updatedUser,
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred while updating user",
            });
        });
}

module.exports = {
    createUserController,
    getUserByIdController,
    updateUserController,
};
