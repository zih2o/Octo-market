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
      type: Number,
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
    isRecommend: { type: Boolean },
    isDiscount: { type: Boolean },
    disPercent: { type: Number },
  },
  {
    collection: 'items',
    timestamps: true,
  },
);

export { itemSchema };
