import { model } from "mongoose";
import { categorySchema } from "../schemas/category-schema";

const Category = model("categories", categorySchema);

export class CategoryModel {
    async findAll(){
        const categories = await Category.find({});
        return categories
    }

    async findByName(cat_name){
        const category = await Category.findOne({name: cat_name})
        return category
    }

    async findById(cat_id){
        const category = await Category.findOne({_id: cat_id})
        return category
    }

    async createCategory(categoryInfo){
        const newCategory = await new Category(categoryInfo).save()
        return newCategory
    }

    async updateCategory(cat_id, update){
        const option = { returnOriginal: false };
        const updatedCategory = await Category.findOneAndUpdate(
            {_id: cat_id},
            update, 
            option,
            );
        return updatedCategory;
    }

    async removeCategory(cat_id){
        await Category.deleteOne({_id: cat_id})
        return;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel }