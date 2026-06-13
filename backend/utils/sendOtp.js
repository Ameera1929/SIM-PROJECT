const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const sendOtp = async (email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "SIM Project OTP Verification",
            html: `
                <h2>OTP Verification</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log("OTP Sent Successfully");

    } catch (error) {

        console.error("Email Error:", error);

        throw error;
    }
};

module.exports = sendOtp;
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

        customerId: {
            type: String,
            default: null
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
exports.userSchema = userSchema;
