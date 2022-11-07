import Joi from 'joi';

const categoryJoiSchema = Joi.object({
  name: Joi.string().trim().required().min(1).max(10).messages({
    'any.required': 'Category 이름은 반드시 입력해야 합니다.',
    'string.max': 'Category 이름은 최대 10글자입니다.',
  }),
});

export { categoryJoiSchema };
