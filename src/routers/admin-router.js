import { Router } from 'express';
import { adminRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';
import * as adminController from '../controller/admin-controller';
import * as Joi from "joi"
import { createValidator } from 'express-joi-validation';

const adminRouter = Router();
const validator = createValidator({});

// Joi Validation Schema

const adminBodySchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .min(1)
    .max(10),
})

// Admin login

adminRouter.post('/login', adminController.login);
adminRouter.post('/signup', adminController.signup);

// Category Admin

adminRouter.post(
  '/categories',
  validator.body(adminBodySchema),
  adminRequired,
  categoryController.createCategory,
);

adminRouter.put(
  '/categories/:cat_id',
  validator.body(adminBodySchema),
  adminRequired,
  categoryController.updateCategory,
);

adminRouter.delete(
  '/categories/:cat_id',
  adminRequired,
  categoryController.removeCategory,
);

// Item admin


export { adminRouter };
