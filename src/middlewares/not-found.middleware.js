const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) =>
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "Route does not exist",
        data: {},
    });

module.exports = notFound;
