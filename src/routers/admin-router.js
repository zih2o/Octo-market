import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';
import * as adminController from '../controller/admin-controller';
import * as itemController from '../controller/item-controller';
import * as orderController from '../controller/order-controller';
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
  loginRequired,
  categoryController.createCategory,
);

adminRouter.put(
  '/categories/updateInfo/:cat_id',
  validator.body(categoryBodySchema),
  loginRequired,
  categoryController.updateCategory,
);

adminRouter.delete(
<<<<<<< HEAD
  '/categories/delete/:cat_id',
  adminRequired,
=======
  '/categories/:cat_id',
  loginRequired,
>>>>>>> 6fa61c0 ([feat]: OrderAPI)
  categoryController.removeCategory,
);

// Item admin

adminRouter.post('/items', loginRequired, itemController.createItem);
adminRouter.put('/items/:item_id', loginRequired, itemController.updateItem);
adminRouter.delete('/items/:item_id', loginRequired, itemController.deleteItem);

// Order admin

adminRouter.get('/orders', loginRequired, orderController.getAll);
adminRouter.put(
  '/orders/:order_id',
  loginRequired,
  orderController.updateOrder,
);
adminRouter.delete(
  '/orders/:order_id',
  loginRequired,
  orderController.removeOrder,
);

export { adminRouter };
