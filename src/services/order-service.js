import { orderModel } from '../db';
import { usersModel } from '../db';
import { adminModel } from '../db';
import { CustomError } from '../middlewares';

export class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async getAll(currentUserId) {
    const admin = await adminModel.findById(currentUserId);
    if (admin === null && userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    const orders = await orderModel.findAll();
    return orders;
  }

  async getByEmail(currentUserId, userId) {
    const admin = await adminModel.findById(currentUserId);
    if (admin === null && userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    const user = await usersModel.findById(userId);
    if (!user) {
      throw new CustomError(404, '사용자를 찾을 수 없습니다.');
    }
    const email = user.email;
    const orders = await orderModel.findByEmail(email);
    return orders;
  }

  async getById(currentUserId, orderId) {
    const order = await orderModel.findById(orderId);
    if (!order || order === null) {
      throw new CustomError(404, '조회하신 주문이 존재하지 않습니다.');
    }
    const userEmail = order.email;
    console.log(userEmail);
    const user = await usersModel.findByEmail(userEmail);
    const admin = await adminModel.findById(currentUserId);

    if (admin === null && user.id !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    return order;
  }

  async createOrder(userId, currentUserId, orderInfo) {
    if (userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    const order = await orderModel.createOrder(orderInfo);
    return order;
  }

  async updateOrder(currentUserId, orderId, toUpdate) {
    const admin = await adminModel.findById(currentUserId);
    if (admin === null && userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    const updatedOrder = await orderModel.updateOrder(orderId, toUpdate);
    if (updatedOrder === null) {
      throw new CustomError(404, '조회하신 주문이 존재하지 않습니다.');
    }
    return updatedOrder;
  }

  async removeOrder(currentUserId, orderId) {
    const admin = await adminModel.findById(currentUserId);
    if (admin === null && userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    await orderModel.removeOrder(orderId);
    return;
  }
}

const orderService = new OrderService();
export { orderService };
