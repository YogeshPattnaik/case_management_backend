const createCloudinaryUploader = require('./cloudinaryUploader');
const createS3Uploader = require('./s3Uploader');
const createLocalUploader = require('./localUploader');

const activeStorage = process.env.ACTIVE_STORAGE || 'local';

const getUploader = (folder = 'general') => {
  switch (activeStorage) {
    case 'cloudinary':
      return createCloudinaryUploader(folder);
    case 's3':
      return createS3Uploader(folder);
    case 'local':
    default:
      return createLocalUploader(folder);
  }
};

module.exports = getUploader;
