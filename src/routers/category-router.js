import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { adminRequired } from '../middlewares';
import * as categoryController from '../controller/category-controller';

const categoriesRouter = Router();

  categoriesRouter.get('/', categoryController.getCategories)
  categoriesRouter.get('/:cat_id', categoryController.getCategory)

export { categoriesRouter };
