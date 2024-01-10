import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import User from "../models/user.model.js";
import { generateOTP, sendOTPEmail, verifyOTP } from "../utils/otp.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";

export const userRegister = async (req, res) => {
  const { userName, email, phone, password } = req.body;

  try {
    if (!userName || !email || !phone || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "All fields are mandatory.",
      });
    }

    if (password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Password must be at least 6 characters long." });
    }
    // Check for existing user by email or phone number
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      const errorMessage =
        existingUser.email === email
          ? "Email address is already registered."
          : "Phone number is already registered.";

      return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp, otpExpiry } = generateOTP();

    const user = await User.create({
      userName,
      email,
      phone,
      otp,
      otpExpiry,
      password: hashedPassword,
    });

    // TODO: SEND OTP TO PHONE NUMBER
    sendOTPEmail(email, otp);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong while registering user." });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide valid email and password." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No user found with this email." });
    }
    if (!existingUser.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please verify your account first." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid credentials." });
    }

    const accessToken = generateAccessToken({
      _id: existingUser._id,
      role: existingUser.role,
    });
    const refreshToken = generateRefreshToken({
      _id: existingUser._id,
    });

    const u = await User.findByIdAndUpdate(existingUser._id, {
      $set: { refreshToken },
    });

    const user = {
      userId: u._id,
      role: u.role,
      username: u.userName,
      profileImage: u.profileImage,
    };
    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully logged in", accessToken, user });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong while logging in user." });
  }
};

export const verifyUser = async (req, res) => {
  const { otp } = req.body;
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid userId format." });
    }

    if (!otp) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please provide a valid OTP." });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found." });
    }
    if (existingUser.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Your account is already verified." });
    }

    const verificationResult = verifyOTP(
      parseInt(otp),
      existingUser.otp,
      existingUser.otpExpiry
    );

    if (!verificationResult.isValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: verificationResult.message });
    }

    // If OTP is valid, update the isVerified field to true
    await User.findByIdAndUpdate(existingUser._id, {
      $set: { isVerified: true, otp: null, otpExpiry: null },
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "OTP verification successful." });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong during OTP verification." });
  }
};

export const me = async (req, res) => {
  const userId = req.user._id;

  try {
    const existingUser = await User.findById(userId)
      .populate("birthCertificates")
      .populate("abibahitCertificates")
      .select("-password -refreshToken -__v -otp -otpExpiry");

    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found. Please register first." });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully fetched user", user: existingUser });
  } catch (error) {
    console.error("Error while getting profile", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error while getting profile." });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("birthCertificates")
      .populate("abibahitCertificates")
      .select("-password -refreshToken -__v -otp -otpExpiry");

    return res
      .status(StatusCodes.OK)
      .json({ message: "Successfully fetched user", users });
  } catch (error) {
    console.error("Error while getting users", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error while getting users." });
  }
};

export const requestOTP = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid userId format." });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found. Please register first." });
    }
    if (existingUser.isVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Your account is already verified." });
    }

    const { otp, otpExpiry } = generateOTP();
    await existingUser.updateOne({ $set: { otp, otpExpiry } });

    // TODO: Send the OTP to the user (e.g., via email or SMS)
    sendOTPEmail(existingUser.email, otp);

    return res.status(StatusCodes.OK).json({
      message: "OTP request successful. Check your email for the OTP.",
    });
  } catch (error) {
    console.error("OTP request error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong during OTP request." });
  }
};

export const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No file uploaded." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profileImage: req.file.filename } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found. Please register first." });
    }

    return res.status(StatusCodes.CREATED).json({ message: "Image uploaded" });
  } catch (error) {
    console.error("Upload profile image error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong during profile image upload." });
  }
};

export const uploadCitizenship = async (req, res) => {
  try {
    const userId = req.user._id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found. Please register first." });
    }

    const frontImage = req.files["front"][0];
    const backImage = req.files["back"][0];

    // Check if both front and back images are provided
    if (!frontImage || !backImage) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please provide both front and back images." });
    }

    // Update citizenship images in the user document
    existingUser.citizenShip = {
      front: frontImage.filename,
      back: backImage.filename,
    };

    await existingUser.save();

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Citizenship images uploaded." });
  } catch (error) {
    console.error("Citizenship image upload error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong during citizenship image upload." });
  }
};
