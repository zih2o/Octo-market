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

// 회원정보수정
const updateUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const { password, currentPassword, address, phoneNum } = req.body;

    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { user_id, currentPassword };
    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNum && { phoneNum }),
    };

    const updatedUserInfo = await userService.updateUser(
      userInfoRequired,
      toUpdate,
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
};
export { signup, login, updateUser };
