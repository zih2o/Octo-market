import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { adminRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';

const categoriesRouter = Router();

categoriesRouter.post('/', 
    loginRequired, 
    adminRequired, 
    categoryController.createCategory
);

categoriesRouter.put(
  '/:cat_id',
  loginRequired,
  adminRequired,
  categoryController.updateCategory,
);

categoriesRouter.delete(
    '/:cat_id',
    loginRequired,
    adminRequired,
    categoryController.removeCategory,
  );

  categoriesRouter.get('/', categoryController.getCategories)
  categoriesRouter.get('/:cat_id', categoryController.getCategory)

export { categoriesRouter };
