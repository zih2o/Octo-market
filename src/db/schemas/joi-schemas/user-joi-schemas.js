import Joi from 'joi';

const signUpJoiSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    'any.required': 'name은 반드시 입력해야 합니다.',
    'string.min': 'name은 최소 2글자 이상입니다.',
  }),
  email: Joi.string().trim().email().required().messages({
    'any.required': 'email은 반드시 입력해야 합니다.',
    'string.email': 'email 형식이 잘못되었습니다.',
  }),
  password: Joi.string().trim().min(8).max(20).required().messages({
    'any.required': 'password는 반드시 입력해야 합니다.',
    'string.min': 'password는 최소 8글자 이상입니다.',
    'string.max': 'password는 최대 20글자 이하입니다.',
  }),
  phoneNum: Joi.string().trim().required().messages({
    'any.required': 'phoneNum은 반드시 입력해야 합니다.',
  }),
  address: Joi.object()
    .keys({
      postalCode: Joi.string().trim().length(5).required().messages({
        'any.required': 'postalCode는 반드시 입력해야 합니다.',
        'string.length': 'postalCode는 5글자입니다.',
      }),
      address1: Joi.string().trim().min(1).required().messages({
        'any.required': 'address1은 반드시 입력해야 합니다.',
        'string.min': 'address1은 최소 1글자입니다.',
      }),
      address2: Joi.string().trim().min(1).required().messages({
        'any.required': 'address2은 반드시 입력해야 합니다.',
        'string.min': 'address2은 최소 1글자입니다.',
      }),
    })
    .required()
    .messages({
      'any.required': 'address는 반드시 입력해야 합니다.',
    }),
  userType: Joi.string().required().messages({
    'any.required': 'userType은 반드시 입력해야 합니다.',
  }),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'any.required': 'email은 반드시 입력해야 합니다.',
    'string.email': 'email 형식이 잘못되었습니다.',
  }),
  password: Joi.string().trim().min(8).max(20).required().messages({
    'any.required': 'password는 반드시 입력해야 합니다.',
    'string.min': 'password는 최소 8글자 이상입니다.',
    'string.max': 'password는 최대 20글자 이하입니다.',
  }),
});

const findEmailJoiSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    'any.required': 'name은 반드시 입력해야 합니다.',
    'string.min': 'name은 최소 2글자 이상입니다.',
  }),
  phoneNum: Joi.string().trim().required().messages({
    'any.required': 'phoneNum은 반드시 입력해야 합니다.',
  }),
});

const updateJoiSchema = Joi.object({
  password: Joi.string().trim().min(8).max(20).required().messages({
    'any.required': 'password는 반드시 입력해야 합니다.',
    'string.min': 'password는 최소 8글자 이상입니다.',
    'string.max': 'password는 최대 20글자 이하입니다.',
  }),
  currentPassword: Joi.string().trim().min(8).max(20).required().messages({
    'any.required': 'password는 반드시 입력해야 합니다.',
    'string.min': 'password는 최소 8글자 이상입니다.',
    'string.max': 'password는 최대 20글자 이하입니다.',
  }),
  address: Joi.object()
    .keys({
      postalCode: Joi.string().trim().length(5).required().allow('').messages({
        'string.length': 'postalCode는 5글자입니다.',
      }),
      address1: Joi.string().trim().min(1).required().allow('').messages({
        'string.min': 'address1은 최소 1글자입니다.',
      }),
      address2: Joi.string().trim().min(1).required().allow('').messages({
        'string.min': 'address2은 최소 1글자입니다.',
      }),
    })
    .optional(),
  phoneNum: Joi.string().trim().required().allow(''),
});
export { signUpJoiSchema, loginJoiSchema, updateJoiSchema, findEmailJoiSchema };
