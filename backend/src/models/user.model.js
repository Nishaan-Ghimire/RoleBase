import mongoose from "mongoose";

const UserRole = {
  USER: "user",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    citizenShip: {
      front: { type: String },
      back: { type: String },
    },
    refreshToken: { type: String },
    otp: { type: Number },
    otpExpiry: { type: Date },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    birthCertificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BirthCertificates",
      },
    ],
    abibahitCertificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AbibahitCertificates",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
