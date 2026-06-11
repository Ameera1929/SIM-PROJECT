const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

    email: String,

    otp: String,

    attempts: {
        type: Number,
        default: 0
    },

    expiresAt: Date

});

module.exports = mongoose.model("Otp", otpSchema);