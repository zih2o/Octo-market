import { Schema } from 'mongoose';

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'items',
    timestamps: true,
  },
);

export { itemSchema };
