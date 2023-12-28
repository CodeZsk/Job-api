// model
const User = require("../models/user.model");

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

const hello = async (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        msg: "Successful",
        data: "hello world! it's working",
        nbHits: data.length,
    });
};

module.exports = {
    hello,
};
