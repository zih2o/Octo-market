import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }

  return value;
}

export const config = {
  host: {
    port: parseInt(required('PORT', 5050)),
  },
  db: {
    host: required('MONGODB_URL'),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  jwt: {
    accessSecret: required('JWT_SECRET_KEY'),
    accessExpiresIn: required('JWT_ACCESS_EXPIRES'),
  },
  awsS3: {
    accessKeyId: required('AWS_ACCESS_KEY_ID'),
    accessKey: required('AWS_ACCESS_KEY'),
    accessRegion: required('AWS_ACCESS_REGION'),
    accessBucket: required('AWS_ACCESS_BUCKET'),
  },
  mail: {
    mailAddress: required('MAIL_ADDRESS'),
    mailPassword: required('MAIL_PASSWORD'),
  },
};
