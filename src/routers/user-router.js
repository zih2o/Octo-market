import { Router } from 'express';
import { loginRequired } from '../middlewares';
import * as usersController from '../controller/user-controller';
import { createValidator } from 'express-joi-validation';
import {
  signUpJoiSchema,
  loginJoiSchema,
  updateJoiSchema,
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

usersRouter.put(
  '/updateInfo/:userId',
  validator.body(updateJoiSchema),
  loginRequired,
  usersController.updateUser,
);

usersRouter.delete(
  '/deleteuser/:userId',
  loginRequired,
  usersController.deleteUser,
);

export { usersRouter };
