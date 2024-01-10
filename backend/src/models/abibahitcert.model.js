import mongoose from "mongoose";

const abibahitCertSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    profileImage: { type: String, required: true },
    fatherName: { type: String, required: true },
    grandFatherName: { type: String, required: true },
    ruralMunicipality: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    address: { type: String, required: true },
    transactionImage: { type: String, required: true },
    abibahitCertificate: { type: String },
    remarks: { type: String },
    isVerified: { type: Boolean, default: false },
    abibahitDate: { type: Date },
    citizenship: {
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

const AbibahitCert = mongoose.model("AbibahitCertificates", abibahitCertSchema);

export default AbibahitCert;
