import { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: 'categories' },
);

export { categorySchema };
