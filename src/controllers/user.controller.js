// model
const User = require("../models/user.model");
// module
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

async function getAllUserController(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);

        const totalUsers = await User.countDocuments();

        if (!users || users.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                msg: "No users found",
            });
        }

        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(StatusCodes.OK).json({
            success: true,
            msg: "Users retrieved successfully",
            data: users,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.error("Error occurred while fetching users:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error occurred",
        });
    }
}

async function getUserController(req, res) {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "User not found" });
        }

        return res.status(StatusCodes.OK).json(user);
    } catch (err) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }
}

async function updateUserController(req, res) {
    const userId = req.user.userId; // Assuming the user ID is passed in the request object
    const updateFields = {
        name: req.body.name,
        dob: req.body.dob,
        gender: req.body.gender,
        education: req.body.education,
        degree: req.body.degree,
        isExperience: req.body.isExperience,
        yearExperience: req.body.yearExperience,
        monthsExperience: req.body.monthsExperience,
        skills: req.body.skills,
        email: req.body.email, // Always update email field, whether it's provided or not
    };

    try {
        // Check if the new email is already taken
        if (req.body.email) {
            const existingUserWithEmail = await User.findOne({
                email: req.body.email,
            });
            if (
                existingUserWithEmail &&
                existingUserWithEmail._id.toString() !== userId
            ) {
                return res
                    .status(StatusCodes.CONFLICT)
                    .json({ success: false, msg: "Email already exists" });
            }
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
            new: true,
        });

        if (!updatedUser) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ success: false, msg: "User not found" });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            msg: "User updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error occurred while updating user:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            msg: "Error occurred while updating user",
        });
    }
}

module.exports = {
    getAllUserController,
    getUserController,
    updateUserController,
};
