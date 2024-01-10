import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationDir = `./public/images/${req.user._id}`;
    fs.mkdirSync(destinationDir, { recursive: true }); // Create directory if it doesn't exist
    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage });

export default uploadMiddleware;
