import { adminService } from '../services';

// 회원가입
const signup = async (req, res, next) => {
  const adminInfo = req.body;
  try {
    const newAdmin = await adminService.createAdmin(adminInfo);

    res.status(201).json(newAdmin);
  } catch (error) {
    next(error);
  }
};
// 로그인
const login = async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const adminInfo = await adminService.createAdminInfo(loginInfo);

    res.status(200).json(adminInfo);
  } catch (error) {
    next(error);
  }
};

export { login, signup };
