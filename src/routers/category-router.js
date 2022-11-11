import { Router } from 'express';
import * as categoryController from '../controller/category-controller';

const categoriesRouter = Router();

categoriesRouter.get('/', categoryController.getCategories);
categoriesRouter.get('/:catId', categoryController.getCategory);

export { categoriesRouter };
