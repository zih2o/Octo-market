import { userService } from '../services';

//
const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserInfo(userId);

    res.status(200).json({
      name: user.name,
      address: user.address,
      phoneNum: user.phoneNum,
    });
  } catch (error) {
    next(error);
  }
};

// 회원가입
const signup = async (req, res, next) => {
  try {
    const newUserInfo = req.body;
    const newUser = await userService.createUser(newUserInfo);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// 로그인
const login = async (req, res, next) => {
  try {
    const loginInfo = req.body;
    const userInfo = await userService.createUserInfo(loginInfo);

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

// email 찾기
const findEmail = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const user = await userService.findEmail(userInfo);

    res.status(200).json({ email: user.email });
  } catch (error) {
    next(error);
  }
};

// 회원정보수정
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password, currentPassword, address, phoneNum } = req.body;

    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    const toUpdate = {
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNum && { phoneNum }),
    };

    const updatedUserInfo = await userService.updateUser(
      userInfoRequired,
      toUpdate,
    );

    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await userService.removeUser(userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
export { getUser, signup, login, findEmail, updateUser, deleteUser };
