import { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    orderInfo: {
      type: [
        new Schema(
          {
            itemId: {
              type: Schema.Types.ObjectId,
              ref: 'items',
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            amount: {
              type: Number,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
          },
          { _id: false },
        ),
      ],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      ref: 'users',
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
      required: true,
    },
    state: {
      type: String,
      default: 'Payment Completed',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  },
);

export { orderSchema };
