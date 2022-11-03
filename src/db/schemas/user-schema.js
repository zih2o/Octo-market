import { Schema } from 'mongoose';

const usersSchema = new Schema(
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
    phoneNum: {
      type: String,
      required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
      required: false,
    },
    userType: {
      type: String,
      required: false,
      default: 'user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { usersSchema };
