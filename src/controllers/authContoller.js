const Auth = require("../models/auth.model");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFound } = require("../errors");

function authController(req, res) {
    const phone = req.body.phoneNo;

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    Auth.findOneAndUpdate({ phone: phone }, { phone: phone }, options)
        .then((data) => {
            console.log(data);
            res.status(StatusCodes.OK).json({
                success: true,
                msg: "Successful",
                data,
                nbHits: data ? 1 : 0,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                msg: "Error occurred",
            });
        });
}

module.exports = { authController };
