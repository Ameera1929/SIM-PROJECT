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