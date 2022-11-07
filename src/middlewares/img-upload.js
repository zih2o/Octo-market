import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region: 'ap-northeast-2',
});

export const imgUpload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'octomaket',
    key(req, file, cb) {
      const extension = file.mimetype.split('/')[1];
      if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension)) {
        return cb(new Error('이미지 파일을 등록해주세요.'));
      }

      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  acl: 'public-read-write',
});
