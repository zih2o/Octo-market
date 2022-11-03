import { categoryModel } from '../db/models/category-model';
import { CustomError } from '../middlewares';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async createCategory(userType, categoryInfo) {
    if (userType !== 'admin') {
      throw new CustomError(403, '관리자가 아닙니다.');
    }
    const { name } = categoryInfo;
    const category = await this.categoryModel.findByName(name);
    if (category) {
      throw new CustomError(409, `${name}은 이미 존재하는 카테고리입니다.`);
    }

    const newCategoryInfo = { name };
    const newCategory = await this.categoryModel.createCategory(
      newCategoryInfo,
    );
    return newCategory;
  }

  async updateCategory(userType, cat_id, update) {
    if (userType !== 'admin') {
      throw new CustomError(403, '관리자가 아닙니다.');
    }
    const category = this.categoryModel.findById(cat_id);
    if (!category) {
      throw new CustomError(
        404,
        `존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.`,
      );
    }
    const updatedCategory = await this.categoryModel.updateCategory(
      cat_id,
      update,
    );
    return updatedCategory;
  }

  async getCategory(cat_id) {
    const category = this.categoryModel.findById(cat_id);
    if (!category) {
      throw new CustomError(
        404,
        `존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.`,
      );
    }
    return category;
  }

  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  async removeCategory(userType, cat_id) {
    if (userType !== 'admin') {
      throw new CustomError(403, '관리자가 아닙니다.');
    }
    await this.categoryModel.removeCategory(cat_id);
    return;
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
