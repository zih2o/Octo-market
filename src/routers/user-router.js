import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import * as usersController from '../controller/user-controller';

const usersRouter = Router();

usersRouter.post('/signup', usersController.signup);
usersRouter.post('/login', usersController.login);
usersRouter.put(
  '/updateInfo/:user_id',
  loginRequired,
  usersController.updateUser,
);

export { usersRouter };
