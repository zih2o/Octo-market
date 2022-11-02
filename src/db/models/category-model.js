import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema";

const Category = model("categories", categorySchema);

export class CategoryModel {
    async findAll(){
        const categories = await Category.find({});
        return categories
    }

    async findById(cat_id){
        const category = await Category.find({id: cat_id})
        return category
    }

    async create(data){
        const category = await Category.create(data)
        return category
    }

    async update(cat_id, data){
        const category = await Category.updateOne({id: cat_id, data})
        return category
    }

    async delete(cat_id){
        await Category.deleteOne({id: cat_id})
        return;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel }