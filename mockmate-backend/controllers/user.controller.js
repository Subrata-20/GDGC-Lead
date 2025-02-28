import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newUser.save();

    // Send response with token
    sendToken(newUser, "User registered successfully", 201, res);
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    sendToken(user, "User Logged in successfully", 200, res);
  } catch (error) {
    console.log("Login error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const logout = async (req,res)=> {
  res.status(200).cookie("token", "",{
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "User Logged Out Successfully"
  })
}