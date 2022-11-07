import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as orderController from '../controller/order-controller';
import { createValidator } from 'express-joi-validation';
import {
  createOrderJoiSchema,
  updateOrderUserJoiSchema,
} from '../db/schemas/joi-schemas';

const orderRouter = Router();
const validator = createValidator({});

orderRouter.get(
  '/personal/:userId',
  loginRequired,
  orderController.getOrdersByUserId,
);
orderRouter.get('/:orderId', loginRequired, orderController.getById);
orderRouter.put(
  '/:orderId',
  validator.body(updateOrderUserJoiSchema),
  loginRequired,
  orderController.updateOrder,
);
orderRouter.post(
  '/personal/:userId',
  validator.body(createOrderJoiSchema),
  loginRequired,
  orderController.createOrder,
);

export { orderRouter };
