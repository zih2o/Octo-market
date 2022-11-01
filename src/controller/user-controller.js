import { userService } from '../services';

// 회원가입
const signup = async (req, res, next) => {
  const { name, email, password, phoneNum, address, userType } = req.body;
  try {
    const newUser = await userService.createUser({
      name,
      email,
      password,
      phoneNum,
      address,
      userType,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// 로그인
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await userService.createUserInfo({ email, password });

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export { signup, login };
