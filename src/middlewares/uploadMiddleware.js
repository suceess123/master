import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Uploads folder का absolute path (src/uploads)
const uploadDir = path.resolve('src', 'uploads');

// अगर folder नहीं है तो बना दो
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // <-- अब सही path
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
