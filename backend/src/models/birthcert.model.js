import mongoose from "mongoose";

const birthCertSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    fatherName: { type: String, required: true },
    grandFatherName: { type: String, required: true },
    ruralMunicipality: { type: String, required: true },
    transactionImage: { type: String, required: true },
    birthCertificate: { type: String },
    remarks: { type: String },
    isVerified: { type: Boolean, default: false },
    fatherCitizenship: {
      front: { type: String },
      back: { type: String },
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BirthCert = mongoose.model("BirthCertificates", birthCertSchema);

export default BirthCert;
