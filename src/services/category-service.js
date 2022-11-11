import { categoryModel } from '../db/models/category-model';
import { CustomError } from '../middlewares';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async createCategory(userType, categoryInfo) {
    if (userType !== 'admin') {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    const count = await this.categoryModel.countCategory();
    if (count == 8) {
      throw new CustomError(409, 'Category 개수가 너무 많습니다.');
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

  async updateCategory(catId, userType, name) {
    if (userType !== 'admin') {
      throw new CustomError(403, '접근권한이 없습니다.');
    }
    const category = this.categoryModel.findById(catId);
    if (!category) {
      throw new CustomError(
        404,
        '존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.',
      );
    }

    if (category.name === name) {
      throw new CustomError(409, `${name}은 이미 존재하는 카테고리입니다.`);
    }

    const updatedCategory = await this.categoryModel.updateCategory(
      catId,
      name,
    );
    return updatedCategory;
  }

  async getCategory(catId) {
    const category = this.categoryModel.findById(catId);
    if (!category) {
      throw new CustomError(
        404,
        '존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.',
      );
    }
    return category;
  }

  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  async removeCategory(userType, catId) {
    const category = await this.categoryModel.findById(catId);
    if (!category) {
      throw new CustomError(
        404,
        `존재하지 않는 카테고리입니다. 다시 한 번 확인해주세요.`,
      );
    }

    if (userType !== 'admin') {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    await this.categoryModel.removeCategory(catId);
    return;
  }
}

export const categoryService = new CategoryService(categoryModel);
