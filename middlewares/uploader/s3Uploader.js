const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const createS3Uploader = (folder = 'general') => {
  return multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'private',
      key: (req, file, cb) => {
        const userId = req.user?._id || 'anonymous';
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, `uploads/user/${userId}/${folder}/${filename}`);
      },
    }),
  }).single('document');
};

module.exports = createS3Uploader;
