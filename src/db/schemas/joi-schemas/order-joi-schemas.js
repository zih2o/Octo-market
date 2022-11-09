import Joi from 'joi';

const createOrderJoiSchema = Joi.object({
  orderInfo: Joi.array()
    .items(
      Joi.object({
        itemId: Joi.string().trim().required(),
        name: Joi.string().trim().required().min(1).max(30).allow(''),
        amount: Joi.number().integer().required().min(1).max(100),
        price: Joi.number().integer().required().min(1),
      }),
    )
    .required()
    .min(1),
  totalPrice: Joi.number().integer().required().min(1),
  userId: Joi.string().trim().required(),
  address: Joi.object({
    postalCode: Joi.string().trim().length(5).required().messages({
      'string.length': 'postalCode는 5글자입니다.',
    }),
    address1: Joi.string().trim().min(1).required().messages({
      'string.min': 'address1은 최소 1글자입니다.',
    }),
    address2: Joi.string().trim().min(1).required().messages({
      'string.min': 'address2은 최소 1글자입니다.',
    }),
  }),
});

const updateOrderAdminJoiSchema = Joi.object({
  state: Joi.string()
    .required()
    .valid('결제 완료', '배송 준비', '배송 중', '배송 완료', '주문 취소'),
});

const updateOrderUserJoiSchema = Joi.object({
  orderInfo: Joi.array()
    .items(
      Joi.object({
        itemId: Joi.string().trim().required(),
        name: Joi.string().trim().required().min(1).max(30).allow(''),
        amount: Joi.number().integer().required().min(1).max(100),
        price: Joi.number().integer().required().min(1),
      }),
    )
    .min(1),
  totalPrice: Joi.number().integer().min(1),
  address: Joi.object({
    postalCode: Joi.string().trim().length(5).messages({
      'string.length': 'postalCode는 5글자입니다.',
    }),
    address1: Joi.string().trim().min(1).messages({
      'string.min': 'address1은 최소 1글자입니다.',
    }),
    address2: Joi.string().trim().min(1).messages({
      'string.min': 'address2은 최소 1글자입니다.',
    }),
  }),
});

export {
  createOrderJoiSchema,
  updateOrderAdminJoiSchema,
  updateOrderUserJoiSchema,
};
