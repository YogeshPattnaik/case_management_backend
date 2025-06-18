const multer = require('multer');
const fs = require('fs');
const path = require('path');

const createLocalUploader = (folder = 'general') => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.user?._id || 'anonymous';
      const uploadPath = path.join(
        process.env.LOCAL_UPLOAD_PATH || 'uploads',
        'user',
        userId.toString(),
        folder
      );
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });

  return multer({ storage }).single('document');
};

module.exports = createLocalUploader;
