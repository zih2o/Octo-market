import { categoryService } from '../services';

// 전체 카테고리 조회
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// 특정 카테고리 조회

const getCategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const category = await categoryService.getCategory(cat_id);

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// 카테고리 추가
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userType = req.userType;
    const newCategoryInfo = { name };
    const newCategory = await categoryService.createCategory(
      userType,
      newCategoryInfo,
    );

    return res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

// 카테고리 업데이트
const updateCategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const { name } = req.body;
    const userType = req.userType;
    const updatedCategory = await categoryService.updateCategory(
      cat_id,
      userType,
      name,
    );

    return res.status(201).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const userType = req.userType;
    await categoryService.removeCategory(userType, cat_id);

    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  removeCategory,
};
