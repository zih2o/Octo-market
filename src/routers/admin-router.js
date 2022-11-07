import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';
import * as adminController from '../controller/admin-controller';
import * as itemController from '../controller/item-controller';
import * as orderController from '../controller/order-controller';
import { createValidator } from 'express-joi-validation';
import {
  createItemJoiSchema,
  updateItemJoiSchema,
} from '../db/schemas/joi-schemas';
import { categoryJoiSchema } from '../db/schemas/joi-schemas';
import { updateOrderJoiSchema } from '../db/schemas/joi-schemas';

const adminRouter = Router();
const validator = createValidator({});

// Admin login

adminRouter.post('/login', adminController.login);
adminRouter.post('/signup', adminController.signup);

// Category Admin

adminRouter.post(
  '/categories',
  validator.body(categoryJoiSchema),
  loginRequired,
  categoryController.createCategory,
);

adminRouter.put(
  '/categories/:catId',
  validator.body(categoryJoiSchema),
  loginRequired,
  categoryController.updateCategory,
);

adminRouter.delete(
  '/categories/:catId',
  loginRequired,
  categoryController.removeCategory,
);

// Item admin

adminRouter.post(
  '/items',
  validator.body(createItemJoiSchema),
  loginRequired,
  itemController.createItem,
);
adminRouter.put(
  '/items/:itemId',
  validator.body(updateItemJoiSchema),
  loginRequired,
  itemController.updateItem,
);
adminRouter.delete('/items/:itemId', loginRequired, itemController.deleteItem);

// Order admin

adminRouter.get('/orders', loginRequired, orderController.getAll);
adminRouter.put(
  '/orders/:orderId',
  validator.body(updateOrderJoiSchema),
  loginRequired,
  orderController.updateOrder,
);
adminRouter.delete(
  '/orders/:orderId',
  loginRequired,
  orderController.removeOrder,
);

export { adminRouter };
