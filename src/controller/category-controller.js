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
    const { catId } = req.params;
    const category = await categoryService.getCategory(catId);

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// 카테고리 추가
const createCategory = async (req, res, next) => {
  try {
    const newCategoryInfo = req.body;
    const userType = req.userType;
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
    const { catId } = req.params;
    const toUpdate = req.body;
    const userType = req.userType;
    const updatedCategory = await categoryService.updateCategory(
      catId,
      userType,
      toUpdate,
    );

    return res.status(201).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const { catId } = req.params;
    const userType = req.userType;
    await categoryService.removeCategory(userType, catId);

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
