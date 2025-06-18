const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

const createCloudinaryUploader = (folder = 'general') => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
      const userId = req.user?._id || 'anonymous';
      return {
        folder: `uploads/user/${userId}/${folder}`, // 👈 exact path structure
        resource_type: 'auto',
        allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
      };
    },
  });

  return multer({ storage }).single('document');
};

module.exports = createCloudinaryUploader;
