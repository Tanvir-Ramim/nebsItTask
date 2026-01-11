import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../.store/files/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadToServer = multer({
  storage: storage,

  fileFilter: (req, file, cb: FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|webp|pdf/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (!extname || !mimeType) {
      return cb(new Error("Only images and PDFs are allowed"));
    }

    cb(null, true);
  },
});

export default uploadToServer;
