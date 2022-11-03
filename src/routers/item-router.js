import { Router } from 'express';

import * as itemsController from '../controller/item-controller.js';

const itemsRouter = Router();

itemsRouter.get('/', itemsController.getItems);
itemsRouter.get('/:cat_id', itemsController.getByCategoryID);
itemsRouter.get('/:item_id', itemsController.getByItemID);

export { itemsRouter };
