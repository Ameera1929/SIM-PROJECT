const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    },

    role: {
        type: String,
        enum: ["super_admin", "customer_admin", "customer_user"],
        default: "customer_user"
    },

    isActive: {
        type: Boolean,
        default: false
    },

    otpVerified: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);