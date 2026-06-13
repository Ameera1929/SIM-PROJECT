const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const otpGenerator = require("otp-generator");

const sendOtp = require("../utils/sendOtp");

exports.signup = async (req, res) => {
    try {

        console.log("BODY RECEIVED:", req.body);

        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({
                success: false,
                message: "Username and Email are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username or Email already exists"
            });
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            attempts: 0,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });

        await sendOtp(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        console.error("SIGNUP ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(404).json({
                success: false,
                message: "OTP not found"
            });
        }

        if (otpRecord.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (otpRecord.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.createPassword = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        await Otp.deleteMany({ email });

        return res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.error("CREATE PASSWORD ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and Password are required"
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


exports.getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


exports.updateUser = async (req, res) => {

    try {

        const user =
        await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.createUser = async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            role
        } = req.body;

        const existingUser =
        await User.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if(existingUser){

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword =
        await bcrypt.hash(password, 10);

        const user =
        await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch(error){

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};