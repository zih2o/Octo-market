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
  async findByEmail(email) {
    const orders = await Order.find({ email });
    return orders;
  }

  async findById(_id) {
    const order = await Order.findOne({ _id });
    return order;
  }

  async updateOrder(_id, toUpdate) {
    const option = { returnOriginal: false };
    const updatedOrder = await Order.findOneAndUpdate(
      { _id },
      toUpdate,
      option,
    );
    return updatedOrder;
  }

  async createOrder(orderInfo) {
    const order = await Order.create(orderInfo);
    return order;
  }

  async removeOrder(_id) {
    await Order.deleteOne({ _id });
    return;
  }
}

const orderModel = new OrderModel();

export { orderModel };
