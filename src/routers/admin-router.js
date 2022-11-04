import { Router } from 'express';
import { adminRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';
import * as adminController from '../controller/admin-controller';
import * as itemController from '../controller/item-controller';
import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const adminRouter = Router();
const validator = createValidator({});

// Joi Validation Schema

const categoryBodySchema = Joi.object({
  name: Joi.string().trim().required().min(1).max(10),
});

// const itemBodySchema = Joi.object({

// })

// Admin login

adminRouter.post('/login', adminController.login);
adminRouter.post('/signup', adminController.signup);

// Category Admin

adminRouter.post(
  '/categories',
  validator.body(categoryBodySchema),
  adminRequired,
  categoryController.createCategory,
);

adminRouter.put(
  '/categories/updateInfo/:cat_id',
  validator.body(categoryBodySchema),
  adminRequired,
  categoryController.updateCategory,
);

adminRouter.delete(
  '/categories/delete/:cat_id',
  adminRequired,
  categoryController.removeCategory,
);

// Item admin

adminRouter.post('/items', adminRequired, itemController.createItem);
adminRouter.put(
  '/items/updateInfo/:item_id',
  adminRequired,
  itemController.updateItem,
);
adminRouter.delete(
  '/items/delete/:item_id',
  adminRequired,
  itemController.deleteItem,
);

export { adminRouter };
