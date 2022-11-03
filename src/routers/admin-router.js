import { Router } from 'express';
import { adminRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';
import * as adminController from '../controller/admin-controller';

const adminRouter = Router();

// Admin login

adminRouter.post('/login', adminController.login);
adminRouter.post('/signup', adminController.signup);

// Category Admin

adminRouter.post(
  '/categories',
  adminRequired,
  categoryController.createCategory,
);

adminRouter.put(
  '/categories/:cat_id',
  adminRequired,
  categoryController.updateCategory,
);

adminRouter.delete(
  '/categories/:cat_id',
  adminRequired,
  categoryController.removeCategory,
);

export { adminRouter };
