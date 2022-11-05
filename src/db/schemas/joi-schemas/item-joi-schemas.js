import Joi from 'joi';

const createItemJoiSchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).required().messages({
    'any.required': 'name 반드시 입력해야 합니다.',
    'string.min': 'name 최소 1글자 이상입니다.',
    'string.max': 'name 최대 30글자 이하입니다.',
  }),
  brand: Joi.string().trim().min(10).max(200).required().messages({
    'any.required': 'brand를 반드시 입력해야 합니다.',
    'string.min': 'brand 최소 10글자 이상입니다.',
    'string.max': 'brand 최대 200글자 이하입니다.',
  }),
  price: Joi.string().trim().min(1).required().messages({
    'any.required': 'brand 반드시 입력해야 합니다.',
    'string.min': 'brand 최소 1글자 이상입니다.',
  }),
  description: Joi.string().trim().min(1).required().messages({
    'any.required': 'brand 반드시 입력해야 합니다.',
    'string.min': 'brand 최소 1글자 이상입니다.',
  }),
  category: Joi.string().hex().length(24).required().messages({
    'any.required': 'category는 반드시 입력해야 합니다.',
    'string.length': 'category 24글자 입니다.',
  }),
  imageUrl: Joi.string().uri().required().messages({
    'any.required': 'imageUrl은 반드시 입력해야 합니다.',
    'string.uri': 'imageUrl의 형식이 잘못되었습니다.',
  }),
});

const updateItemJoiSchema = Joi.object({
  name: Joi.string().trim().min(1).max(30).required().allow('').messages({
    'string.min': 'name 최소 1글자 이상입니다.',
    'string.max': 'name 최대 30글자 이하입니다.',
  }),
  brand: Joi.string().trim().min(10).max(200).required().allow('').messages({
    'string.min': 'brand 최소 10글자 이상입니다.',
    'string.max': 'brand 최대 200글자 이하입니다.',
  }),
  price: Joi.string().trim().min(1).required().allow('').messages({
    'string.min': 'price 최소 1글자 이상입니다.',
  }),
  description: Joi.string().trim().min(1).required().allow('').messages({
    'string.min': 'description 최소 1글자 이상입니다.',
  }),
  imageUrl: Joi.string().uri().allow('').required().allow('').messages({
    'string.uri': 'imageUrl의 형식이 잘못되었습니다.',
  }),
});

export { createItemJoiSchema, updateItemJoiSchema };
