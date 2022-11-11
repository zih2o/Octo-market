import { orderModel, adminModel, usersModel } from '../db';
import { CustomError } from '../middlewares';
import { sendMail } from '../utils/mail.js';

export class OrderService {
  constructor(orderModel, adminModel) {
    this.orderModel = orderModel;
    this.adminModel = adminModel;
    this.usersModel = usersModel;
  }
  async getAll(currentUserId) {
    const admin = await this.adminModel.findById(currentUserId);
    if (!admin) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    const orders = await this.orderModel.findAll();
    return orders;
  }

  async getOrdersByUserId(currentUserId, userId) {
    // admin이 아니거나 접근한 user가 보려고 하는 페이지가 user의 페이지가 아닌 경우 권한 없음
    const admin = await this.adminModel.findById(currentUserId);
    if (!admin && userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    const orders = await this.orderModel.findByUserId(userId);
    return orders;
  }

  async getById(currentUserId, orderId) {
    const order = await this.orderModel.findByOrderId(orderId);
    if (!order) {
      throw new CustomError(404, '조회하신 주문이 존재하지 않습니다.');
    }
    const admin = await this.adminModel.findById(currentUserId);
    if (!admin && order.userId != currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    return order;
  }

  async createOrder(userId, currentUserId, orderInfo) {
    if (userId !== currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    const order = await this.orderModel.createOrder(orderInfo);
    //메일발송
    const user = await this.usersModel.findById(order.userId);
    sendMail(user.email);
    return order;
  }

  async updateOrder(currentUserId, orderId, toUpdate) {
    const order = await this.orderModel.findByOrderId(orderId);
    if (!order) {
      throw new CustomError(404, '조회하신 주문이 존재하지 않습니다.');
    }
    const admin = await this.adminModel.findById(currentUserId);
    if (!admin && order.userId != currentUserId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    // User가 주문 수정 요청 시 주문 상태가 배송 전 일때만 배송 수정 가능
    if (order.userId == currentUserId) {
      if (order.state !== '결제 완료' && order.state !== '배송 준비') {
        throw new CustomError(
          409,
          '배송이 시작되어 주문을 변경할 수 없습니다.',
        );
      }
    }
    const updatedOrder = await this.orderModel.updateOrder(orderId, toUpdate);
    return updatedOrder;
  }

  async removeOrder(currentUserId, orderId) {
    const admin = await this.adminModel.findById(currentUserId);
    if (!admin) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }
    await this.orderModel.removeOrder(orderId);
    return;
  }
}

export const orderService = new OrderService(
  orderModel,
  adminModel,
  usersModel,
);
