import jwt from "jsonwebtoken";

const generateAccessToken = ({ _id, role }) => {
  return jwt.sign(
    { _id, role },
    process.env.ACCESS_TOKEN_SECRET || "accesssecret",
    {
      expiresIn: "1d",
    }
  );
};

const generateRefreshToken = ({ _id }) => {
  return jwt.sign(
    { _id },
    process.env.REFRESH_TOKEN_SECRET || "refreshsecret",
    {
      expiresIn: "7d",
    }
  );
};

export { generateAccessToken, generateRefreshToken };
