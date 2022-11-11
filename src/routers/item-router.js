import { Router } from 'express';

import * as itemsController from '../controller/item-controller.js';
const itemsRouter = Router();

itemsRouter.get('/', itemsController.getItems);
itemsRouter.get('/category/:catId', itemsController.getByCategoryID);
itemsRouter.get('/:itemId', itemsController.getByItemID);

export { itemsRouter };
