import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as usersController from '../controller/user-controller';
import { createValidator } from 'express-joi-validation';
import {
  signUpJoiSchema,
  loginJoiSchema,
  updateJoiSchema,
  findEmailJoiSchema,
} from '../db/schemas/joi-schemas';

const usersRouter = Router();
const validator = createValidator();

usersRouter.post(
  '/signup',
  validator.body(signUpJoiSchema),
  usersController.signup,
);

usersRouter.post(
  '/login',
  validator.body(loginJoiSchema),
  usersController.login,
);

usersRouter.post(
  '/findemail',
  validator.body(findEmailJoiSchema),
  usersController.findEmail,
);

usersRouter.get('/:userId', loginRequired, usersController.getUser);

usersRouter.put(
  '/:userId',
  validator.body(updateJoiSchema),
  loginRequired,
  usersController.updateUser,
);

usersRouter.delete('/:userId', loginRequired, usersController.deleteUser);

export { usersRouter };
