import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as orderController from '../controller/order-controller';

const orderRouter = Router();

orderRouter.get('/users/:user_id', loginRequired, orderController.getByEmail);
orderRouter.get('/:order_id', loginRequired, orderController.getById);
orderRouter.post('/users/:user_id', loginRequired, orderController.createOrder);

export { orderRouter };
