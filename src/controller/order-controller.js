import { orderService } from '../services';

const getAll = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const orders = await orderService.getAll(currentUserId);
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getByEmail = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.currentUserId;
    const orders = await orderService.getUserOrderListById(
      currentUserId,
      userId,
    );
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const currentUserId = req.currentUserId;
    const order = await orderService.getById(currentUserId, orderId);
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.currentUserId;
    const newOrderInfo = req.body;
    const order = await orderService.createOrder(
      userId,
      currentUserId,
      newOrderInfo,
    );
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const currentUserId = req.currentUserId;
    const { orderInfo, totalPrice, email, address, state } = req.body;
    const toUpdate = {
      ...(orderInfo && { orderInfo }),
      ...(totalPrice && { totalPrice }),
      ...(email && { email }),
      ...(address && { address }),
      ...(state && { state }),
    };
    const order = await orderService.updateOrder(
      currentUserId,
      orderId,
      toUpdate,
    );
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const removeOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const currentUserId = req.currentUserId;
    await orderService.removeOrder(currentUserId, orderId);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { getAll, getByEmail, getById, createOrder, updateOrder, removeOrder };
