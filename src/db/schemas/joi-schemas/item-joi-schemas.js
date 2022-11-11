import Joi from 'joi';

const createItemJoiSchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).required().messages({
    'any.required': 'name 반드시 입력해야 합니다.',
    'string.min': 'name 최소 1글자 이상입니다.',
    'string.max': 'name 최대 30글자 이하입니다.',
  }),
  brand: Joi.string().trim().min(1).required().messages({
    'any.required': 'brand를 반드시 입력해야 합니다.',
    'string.min': 'brand 최소 1글자 이상입니다.',
  }),
  price: Joi.number().min(1).required().messages({
    'any.required': 'price 반드시 입력해야 합니다.',
  }),
  description: Joi.string().trim().min(10).max(1000).required().messages({
    'any.required': 'description 반드시 입력해야 합니다.',
    'string.min': 'description 최소 1글자 이상입니다.',
    'string.max': 'description 최대 1000글자 이하입니다.',
  }),
  category: Joi.string().hex().length(24).required().messages({
    'any.required': 'category는 반드시 입력해야 합니다.',
    'string.length': 'category 24글자 입니다.',
  }),
  imageUrl: Joi.string().uri().required().messages({
    'any.required': 'imageUrl은 반드시 입력해야 합니다.',
    'string.uri': 'imageUrl의 형식이 잘못되었습니다.',
  }),
  isRecommend: Joi.boolean(),
  isDiscount: Joi.boolean(),
  disPercent: Joi.number(),
});

const updateItemJoiSchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).required().allow('').messages({
    'string.min': 'name 최소 1글자 이상입니다.',
    'string.max': 'name 최대 30글자 이하입니다.',
  }),
  brand: Joi.string().trim().min(1).required().allow('').messages({
    'string.min': 'brand 최소 10글자 이상입니다.',
  }),
  price: Joi.number().min(1).allow('').required().messages({
    'string.min': 'price 최소 1글자 이상입니다.',
  }),
  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .allow('')
    .required()
    .messages({
      'string.min': 'description 최소 1글자 이상입니다.',
      'string.max': 'description 최대 1000글자 이하입니다.',
    }),
  imageUrl: Joi.string().uri().allow('').required().messages({
    'string.uri': 'imageUrl의 형식이 잘못되었습니다.',
  }),
  isRecommend: Joi.boolean().required().allow(''),
  isDiscount: Joi.boolean().required().allow(''),
  disPercent: Joi.number().allow(''),
});

export { createItemJoiSchema, updateItemJoiSchema };
