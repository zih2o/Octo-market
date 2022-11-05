import { itemService } from '../services';

// 전체 items 조회
const getItems = async (req, res, next) => {
  try {
    const sorting = req.query.sort;
    const sortCondition = Number(req.query.sc);
    const count = Number(req.query.count || 1);
    const perCount = Number(req.query.perCount || 20);
    const sortingInfo = { sorting, sortCondition, count, perCount };
    const items = await itemService.getAll(sortingInfo);

    console.log(items);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// 카테고리별 items 조회
const getByCategoryID = async (req, res, next) => {
  try {
    const { cat_id } = req.params;
    const sorting = req.query.sort;
    const sortCondition = Number(req.query.sc);
    const count = Number(req.query.count || 1);
    const perCount = Number(req.query.perCount || 20);
    const sortingInfo = { sorting, sortCondition, count, perCount };
    const items = await itemService.getByCategoryId(cat_id, sortingInfo);

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// 특정 item 조회
const getByItemID = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    console.log(item_id);
    const item = await itemService.getByItemID(item_id);

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// item 등록
const createItem = async (req, res, next) => {
  try {
    const { name, brand, price, description, category, imageUrl } = req.body;
    const userType = req.userType;
    const newItem = await itemService.createItem(
      {
        name,
        brand,
        price,
        description,
        category,
        imageUrl,
      },
      userType,
    );
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// item info 수정
const updateItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const userType = req.userType;
    const { name, brand, price, description, imageUrl } = req.body;

    const toUpdate = {
      ...(name && { name }),
      ...(brand && { brand }),
      ...(price && { price }),
      ...(description && { description }),
      ...(imageUrl && { imageUrl }),
    };

    const updatedItemInfo = await itemService.updateItem(
      item_id,
      userType,
      toUpdate,
    );
    res.status(200).json(updatedItemInfo);
  } catch (error) {
    next(error);
  }
};
// item 삭제
const deleteItem = async (req, res, next) => {
  try {
    const { item_id } = req.params;
    const userType = req.userType;
    await itemService.deleteItem(item_id, userType);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
export {
  getItems,
  getByCategoryID,
  getByItemID,
  createItem,
  updateItem,
  deleteItem,
};
