import { adminService } from '../services';

// 회원가입
const signup = async (req, res, next) => {
  const { name, email, password, userType } = req.body;
  try {
    const newAdmin = await adminService.createAdmin({
      name,
      email,
      password,
      userType,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    next(error);
  }
};
// 로그인
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminInfo = await adminService.createAdminInfo({ email, password });

    res.status(200).json(adminInfo);
  } catch (error) {
    next(error);
  }
};

export { login, signup };
