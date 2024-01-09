const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        phone: {
            type: "string",
            required: [true, "Phone number is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Auth", jobSchema);
