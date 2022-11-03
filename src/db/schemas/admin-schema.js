import { Schema } from 'mongoose';

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: false,
      default: 'admin',
    },
  },
  {
    collection: 'admins',
    timestamps: true,
  },
);

export { adminSchema };
