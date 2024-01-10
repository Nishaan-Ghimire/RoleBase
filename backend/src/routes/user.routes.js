import { Router } from "express";
import {
  allUsers,
  me,
  requestOTP,
  uploadCitizenship,
  uploadProfile,
  userLogin,
  userRegister,
  verifyUser,
} from "../controllers/user.controllers.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, allUsers);
router.post("/register", userRegister);
router.post("/login", userLogin);

router.post("/:userId/verify", verifyUser);
router.post("/:userId/request-otp", requestOTP);

router.get("/me", authMiddleware, me);

router.post(
  "/profileImage",
  authMiddleware,
  uploadMiddleware.single("profileImage"),
  uploadProfile
);

router.post(
  "/citizenship",
  authMiddleware,
  uploadMiddleware.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  uploadCitizenship
);

export default router;
