import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Please provide accessToken." });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "accesssecret"
    );
    if (!decoded) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid Access Token" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Error while validating accessToken " + err });
  }
};

export default authMiddleware;
