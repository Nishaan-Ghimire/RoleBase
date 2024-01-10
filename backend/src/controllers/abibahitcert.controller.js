import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import AbibahitCert from "../models/abibahitcert.model.js";
import User from "../models/user.model.js";

export const createAbibahitCert = async (req, res) => {
  try {
    const {
      fullName,
      age,
      address,
      phone,
      fatherName,
      grandFatherName,
      ruralMunicipality,
      wardNumber,
    } = req.body;

    if (
      !fullName ||
      !age ||
      !address ||
      !fatherName ||
      !grandFatherName ||
      !ruralMunicipality ||
      !wardNumber
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "All fields are required" });
    }

    if (isNaN(age) || age < 0 || isNaN(wardNumber) || wardNumber < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Age and wardNumber must be a positive number" });
    }

    if (!req.files) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please upload image" });
    }

    const front = req?.files["front"][0]?.filename;
    const back = req?.files["back"][0]?.filename;
    const profileImage = req?.files["profileImage"][0]?.filename;
    const transactionImage = req?.files["transactionImage"][0]?.filename;

    const abibahitCert = await AbibahitCert.create({
      fullName,
      age,
      address,
      phone,
      fatherName,
      grandFatherName,
      ruralMunicipality,
      wardNumber,
      profileImage,
      transactionImage,
      issuedBy: req.user._id,
      citizenship: { front, back },
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { abibahitCertificates: abibahitCert._id } },
      { new: true }
    );

    return res.status(StatusCodes.CREATED).json(abibahitCert);
  } catch (error) {
    console.error("Error creating abibahit certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create abibahit certificate" });
  }
};

export const updateAbibahitCert = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid abibahit certificate id format." });
  }

  try {
    const {
      fullName,
      age,
      address,
      phone,
      fatherName,
      grandFatherName,
      ruralMunicipality,
      wardNumber,
    } = req.body;

    // Explicitly check for undefined or negative age
    if (
      (!fullName &&
        !age &&
        !address &&
        !fatherName &&
        !grandFatherName &&
        !ruralMunicipality) ||
      (age !== undefined && (isNaN(age) || age < 0)) ||
      (wardNumber !== undefined && (isNaN(wardNumber) || wardNumber < 0))
    ) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: "Invalid input data" });
    }

    const updatedAbibahitCertData = {};

    if (fullName) updatedAbibahitCertData.fullName = fullName;
    if (address) updatedAbibahitCertData.address = address;
    if (age !== undefined) updatedAbibahitCertData.age = age;
    if (fatherName) updatedAbibahitCertData.fatherName = fatherName;
    if (phone) updatedAbibahitCertData.phone = phone;
    if (grandFatherName)
      updatedAbibahitCertData.grandFatherName = grandFatherName;
    if (ruralMunicipality)
      updatedAbibahitCertData.ruralMunicipality = ruralMunicipality;
    if (wardNumber) updatedAbibahitCertData.wardNumber = wardNumber;

    if (req.files["front"]) {
      updatedAbibahitCertData.citizenship = {
        ...updatedAbibahitCertData.citizenship,
        front: req?.files["front"][0]?.filename,
      };
    }
    if (req.files["back"]) {
      updatedAbibahitCertData.citizenship = {
        ...updatedAbibahitCertData.citizenship,
        back: req?.files["back"][0]?.filename,
      };
    }
    if (req.files["transactionImage"]) {
      updatedAbibahitCertData.transactionImage =
        req?.files["transactionImage"][0]?.filename;
    }
    if (req.files["profileImage"]) {
      updatedAbibahitCertData.profileImage =
        req?.files["profileImage"][0]?.filename;
    }

    const updatedAbibahitCert = await AbibahitCert.findByIdAndUpdate(
      req.params.id,
      { $set: updatedAbibahitCertData },
      { new: true }
    );

    if (!updatedAbibahitCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Abibahit certificate not found" });
    }

    return res.status(StatusCodes.OK).json(updatedAbibahitCert);
  } catch (error) {
    console.error("Error updating abibahit certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update abibahit certificate" });
  }
};

export const getAbibahitCert = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }
  try {
    const abibahitCert = await AbibahitCert.findById(req.params.id).populate({
      path: "issuedBy",
      select: "userName email phone role",
    });

    if (!abibahitCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Abibahit certificate not found" });
    }

    return res.status(StatusCodes.OK).json(abibahitCert);
  } catch (error) {
    console.error("Error getting abibahit certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error getting abibahit certificate" });
  }
};

export const getAbibahitCerts = async (req, res) => {
  try {
    const abibahitCerts = await AbibahitCert.find().populate({
      path: "issuedBy",
      select: "userName email phone role",
    });

    return res.status(200).json(abibahitCerts);
  } catch (error) {
    console.error("Error getting abibahit certificates:", error.message);
    return res
      .status(500)
      .json({ error: "Error getting abibahit certificates" });
  }
};

export const verifyAbibahitCert = async (req, res) => {
  const { remarks, isVerified } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }

  try {
    const abibahitCert = await AbibahitCert.findById(req.params.id);

    if (!abibahitCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Abibahit certificate not found" });
    }

    const updatedAbibahitCert = await AbibahitCert.findByIdAndUpdate(
      req.params.id,
      {
        isVerified,
        remarks,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedAbibahitCert);
  } catch (error) {
    console.error("Error updating abibahit certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error updating abibahit certificate" });
  }
};

export const deleteAbibahitCert = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }
  try {
    const abibahitCertId = req.params.id;

    // Find the AbibahitCert document and retrieve the associated User ID
    const abibahitCert = await AbibahitCert.findById(abibahitCertId);
    const userId = abibahitCert.issuedBy;

    // Delete the AbibahitCert document
    await AbibahitCert.findByIdAndDelete(abibahitCertId);

    // Remove the AbibahitCert ID from the User's abibahitCertificates array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { abibahitCertificates: abibahitCertId } },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Abibahit certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting abibahit certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error deleting abibahit certificate" });
  }
};
