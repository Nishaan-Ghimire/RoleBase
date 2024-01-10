import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import BirthCert from "../models/birthcert.model.js";
import User from "../models/user.model.js";

export const createBirthCert = async (req, res) => {
  try {
    const { fullName, age, fatherName, grandFatherName, ruralMunicipality } =
      req.body;
    console.log(req.body);

    if (
      !fullName ||
      !age ||
      !fatherName ||
      !grandFatherName ||
      !ruralMunicipality
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "All fields are required" });
    }

    if (isNaN(age) || age < 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Age must be a positive number" });
    }

    if (!req.files) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Please upload image" });
    }
    // console.log(req.files);
    console.log("We got it", req.files["front"][0]);
    console.log("We got it 2", req.files["back"][1]);
    // console.log(back);
    // console.log(transactionImage);
    const front = req.files["front"][0].filename;
    const back = req.files["back"][0].filename;
    const transactionImage = req.files["transactionImage"][0].filename;

    const birthCert = await BirthCert.create({
      fullName,
      age,
      fatherName,
      grandFatherName,
      ruralMunicipality,
      transactionImage,
      issuedBy: req.user._id,
      fatherCitizenship: { front, back },
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { birthCertificates: birthCert._id } },
      { new: true }
    );

    return res.status(StatusCodes.CREATED).json(birthCert);
  } catch (error) {
    console.error("Error creating birth certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create birth certificate" });
  }
};

export const updateBirthCert = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid birth certificate id format." });
  }

  try {
    const { fullName, age, fatherName, grandFatherName, ruralMunicipality } =
      req.body;

    // Explicitly check for undefined or negative age
    if (
      (!fullName &&
        !age &&
        !fatherName &&
        !grandFatherName &&
        !ruralMunicipality) ||
      (age !== undefined && (isNaN(age) || age < 0))
    ) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: "Invalid input data" });
    }

    const updatedBirthCertData = {};

    if (fullName) updatedBirthCertData.fullName = fullName;
    if (age !== undefined) updatedBirthCertData.age = age;
    if (fatherName) updatedBirthCertData.fatherName = fatherName;
    if (grandFatherName) updatedBirthCertData.grandFatherName = grandFatherName;
    if (ruralMunicipality)
      updatedBirthCertData.ruralMunicipality = ruralMunicipality;

    if (req.files["front"]) {
      updatedBirthCertData.fatherCitizenship = {
        ...updatedBirthCertData.fatherCitizenship,
        front: req.files["front"][0].filename,
      };
    }
    if (req.files["back"]) {
      updatedBirthCertData.fatherCitizenship = {
        ...updatedBirthCertData.fatherCitizenship,
        back: req.files["back"][0].filename,
      };
    }
    if (req.files["transactionImage"]) {
      updatedBirthCertData.transactionImage =
        req.files["transactionImage"][0].filename;
    }

    const updatedBirthCert = await BirthCert.findByIdAndUpdate(
      req.params.id,
      { $set: updatedBirthCertData },
      { new: true }
    );

    if (!updatedBirthCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Birth certificate not found" });
    }

    return res.status(StatusCodes.OK).json(updatedBirthCert);
  } catch (error) {
    console.error("Error updating birth certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to update birth certificate" });
  }
};

export const getBirthCert = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }
  try {
    const birthCert = await BirthCert.findById(req.params.id).populate({
      path: "issuedBy",
      select: "userName email phone role",
    });

    if (!birthCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Birth certificate not found" });
    }

    return res.status(StatusCodes.OK).json(birthCert);
  } catch (error) {
    console.error("Error getting birth certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error getting birth certificate" });
  }
};

export const getBirthCerts = async (req, res) => {
  try {
    const birthCerts = await BirthCert.find().populate({
      path: "issuedBy",
      select: "userName email phone role",
    });

    return res.status(200).json(birthCerts);
  } catch (error) {
    console.error("Error getting birth certificates:", error.message);
    return res.status(500).json({ error: "Error getting birth certificates" });
  }
};

export const verifyBirthCert = async (req, res) => {
  const { remarks, isVerified } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }

  try {
    const birthCert = await BirthCert.findById(req.params.id);

    if (!birthCert) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Birth certificate not found" });
    }

    const updatedBirthCert = await BirthCert.findByIdAndUpdate(
      req.params.id,
      {
        isVerified,
        remarks,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json(updatedBirthCert);
  } catch (error) {
    console.error("Error updating birth certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error updating birth certificate" });
  }
};

export const deleteBirthCert = async (req, res) => {
  const birthCertId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(birthCertId)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid certificate id format." });
  }
  try {
    // Find the BirthCert document and retrieve the associated User ID
    const birthCert = await BirthCert.findById(birthCertId);
    const userId = birthCert.issuedBy;

    // Delete the BirthCert document
    await BirthCert.findByIdAndDelete(birthCertId);

    // Remove the BirthCert ID from the User's birthCertificates array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { birthCertificates: birthCertId } },
      { new: true }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Birth certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting birth certificate:", error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error deleting birth certificate" });
  }
};
