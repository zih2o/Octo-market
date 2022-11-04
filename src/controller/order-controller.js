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
    const { user_id } = req.params;
    const currentUserId = req.currentUserId;
    const orders = await orderService.getByEmail(currentUserId, user_id);
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const currentUserId = req.currentUserId;
    const order = await orderService.getById(currentUserId, order_id);
    return res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const currentUserId = req.currentUserId;
    const { orderInfo, totalPrice, email, address } = req.body;
    const order = await orderService.createOrder(user_id, currentUserId, {
      orderInfo,
      totalPrice,
      email,
      address,
    });
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const currentUserId = req.currentUserId;
    const { orderInfo, totalPrice, email, address, state } = req.body;
    const order = await orderService.updateOrder(currentUserId, order_id, {
      orderInfo,
      totalPrice,
      email,
      address,
      state,
    });
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const removeOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const currentUserId = req.currentUserId;
    await orderService.removeOrder(currentUserId, order_id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export { getAll, getByEmail, getById, createOrder, updateOrder, removeOrder };
