import { model } from 'mongoose';
import { orderSchema } from '../schemas/order-schema';
import { createVirtualId } from '..';

createVirtualId(orderSchema);
const Order = model('orders', orderSchema);

export class OrderModel {
  async findAll() {
    const orders = await Order.find({});
    return orders;
  }
  async findByUserId(userId) {
    const orders = await Order.find({ userId });
    return orders;
  }

  async findByOrderId(orderId) {
    const order = await Order.findOne({ _id: orderId });
    return order;
  }

  async updateOrder(orderId, toUpdate) {
    const option = { returnOriginal: false };
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      toUpdate,
      option,
    );
    return updatedOrder;
  }

  async createOrder(orderInfo) {
    const order = await Order.create(orderInfo);
    return order;
  }

  async removeOrder(orderId) {
    await Order.findOneAndDelete({ _id: orderId });
    return;
  }
}

export const orderModel = new OrderModel();
