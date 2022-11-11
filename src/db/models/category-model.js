import { model } from 'mongoose';
import { categorySchema } from '../schemas/category-schema';
import { createVirtualId } from '..';

createVirtualId(categorySchema);
const Category = model('categories', categorySchema);

export class CategoryModel {
  async findAll() {
    const categories = await Category.find({});
    return categories;
  }

  async findByName(name) {
    const category = await Category.findOne({ name });
    return category;
  }

  async findById(catId) {
    const category = await Category.findOne({ _id: catId });
    return category;
  }

  async createCategory(categoryInfo) {
    const newCategory = await new Category(categoryInfo).save();
    return newCategory;
  }

  async countCategory() {
    const count = await Category.countDocuments({});
    return count;
  }

  async updateCategory(catId, update) {
    const option = { returnOriginal: false };
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: catId },
      update,
      option,
    );
    return updatedCategory;
  }

  async removeCategory(_id) {
    await Category.deleteOne({ _id });
    return;
  }
}

export const categoryModel = new CategoryModel();
