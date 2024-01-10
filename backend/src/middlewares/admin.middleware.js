import { StatusCodes } from "http-status-codes";

const adminMiddleware = async (req, res, next) => {
  try {
    const role = req.user && req.user.role;

    if (!role || role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "Unauthorized access only admins" });
    }

    next();
  } catch (err) {
    console.error("Error while validating admin:", err);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthorized access" });
  }
};

export default adminMiddleware;
