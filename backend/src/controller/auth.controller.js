import NewUser from "../model/User.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import 'dotenv/config';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate input
        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: "Please provide valid information" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Please provide a valid email" });
        }

        // Check if user already exists
        const existingUser = await NewUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new NewUser({
            fullName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("User saved:", savedUser.email);

        // Generate JWT token
        generateToken(savedUser._id, res);

        // Send Welcome Email
        try {
            console.log("Sending welcome email to:", savedUser.email);
            const emailResponse = await sendWelcomeEmail(
                savedUser.email,
                savedUser.fullName,
                process.env.CLIENT_URL
            );
            console.log("Welcome email response:", emailResponse);
        } catch (err) {
            console.error("Failed to send Welcome email:", err);
        }

        // Send response
        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            ProfilePic: savedUser.profilePic,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide both email and password" });
        }

        const user = await NewUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Generate token and set cookie
        generateToken(user._id, res);

        // Send response
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            msg: "Login successful",
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).json({ msg: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ msg: "Profile pic is required" });
        }

        const user = req.user._id;

        const profilepic = await cloudinary.uploader.upload(profilePic);

        const updateResponse = await NewUser.findByIdAndUpdate(
            user,
            { profilePic: profilepic.secure_url },
            { new: true }
        );

        res.status(200).json(updateResponse);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
