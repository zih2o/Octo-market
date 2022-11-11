import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../configuration/config';
import { usersModel } from '../db';
import { CustomError } from '../middlewares';

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserInfo(userId) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new CustomError(
        404,
        '가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    if (user.id !== userId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    return user;
  }

  // 회원가입
  async createUser(userInfo) {
    const { name, email, password, phoneNum, address, userType } = userInfo;
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new CustomError(409, `${email}은 이미 가입 된 회원입니다.`);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      config.bcrypt.saltRounds,
    );
    const newUserInfo = {
      name,
      email,
      password: hashedPassword,
      phoneNum,
      address,
      userType,
    };
    const newUser = await this.userModel.createUser(newUserInfo);
    return newUser;
  }

  // 로그인
  async createUserInfo(loginInfo) {
    const { email, password } = loginInfo;

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new CustomError(
        401,
        'email 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError(
        401,
        'email 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
      );
    }

    const accessToken = jwt.sign(
      { userId: user.id, role: user.userType },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.accessExpiresIn },
    );

    return { accessToken, userId: user.id, userType: user.userType };
  }

  // Email 찾기
  async findEmail(userInfo) {
    const { name, phoneNum } = userInfo;

    const user = await this.userModel.findByNamePhone(name, phoneNum);
    if (!user) {
      throw new CustomError(
        404,
        '가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    if (user.name !== name && user.phoneNum !== phoneNum) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    return user;
  }

  // 회원정보수정
  async updateUser(userInfoRequired, toUpdate) {
    const { userId, currentPassword } = userInfoRequired;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new CustomError(
        404,
        '가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const correctPasswordHash = user.password;
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      correctPasswordHash,
    );

    if (!isValidPassword) {
      throw new CustomError(
        401,
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    const { password } = toUpdate;

    if (password) {
      const newPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
      toUpdate.password = newPassword;
    }
    const updatedUser = await this.userModel.update({
      userId,
      update: toUpdate,
    });
    return updatedUser;
  }

  // 회원계정삭제
  async removeUser(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new CustomError(
        404,
        '가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    if (user.id !== userId) {
      throw new CustomError(403, '접근 권한이 없습니다.');
    }

    await this.userModel.remove(userId);
  }
}

export const userService = new UserService(usersModel);
