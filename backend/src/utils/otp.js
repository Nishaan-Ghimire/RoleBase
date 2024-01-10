import nodemailer from "nodemailer";

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 5); // OTP valid for 5 minutes
  return { otp, otpExpiry };
};

const verifyOTP = (userOTP, generatedOTP, otpExpiry) => {
  const currentTime = new Date();

  if (currentTime > otpExpiry) {
    return { isValid: false, message: "OTP has expired" };
  }

  const isValid = userOTP === generatedOTP;

  return {
    isValid,
    message: isValid ? "OTP is valid" : "Incorrect OTP",
  };
};

async function createTransporter() {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER || "nabin.201347@ncit.edu.np",
      pass: process.env.EMAIL_PASSWORD || "mkdz brpr vscz lzid",
    },
  });
}

async function sendOTPEmail(email, otp) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: {
      name: "Sajilo Sifirish",
      address: process.env.EMAIL_USER || "nabin.201347@ncit.edu.np",
    },
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send OTP email");
  }
}

export { generateOTP, sendOTPEmail, verifyOTP };
