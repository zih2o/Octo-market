import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String,
            required: true,
    },
})

export { categorySchema };