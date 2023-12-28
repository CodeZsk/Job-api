const CustomAPIError = require("./custom.error");
const BadRequestError = require("./bad-request.error");
const UnauthenticatedError = require("./unauthenticated.error");
const NotFound = require("./not-found.error");

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFound,
};
