import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../configuration/config';
import { adminModel } from '../db';
import { CustomError } from '../middlewares';

class AdminService {
  // 본 파일의 맨 아래에서, new AdminService(adminModel) 하면, 이 함수의 인자로 전달됨
  constructor(adminModel) {
    this.adminModel = adminModel;
  }

  //회원가입
  async createAdmin(adminInfo) {
    const { name, email, password, userType } = adminInfo;
    const admin = await this.adminModel.findByEmail(email);
    if (admin) {
      throw new CustomError(409, `${email}은 이미 가입 된 관리자입니다.`);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      config.bcrypt.saltRounds,
    );
    const newAdminInfo = {
      name,
      email,
      password: hashedPassword,
      userType,
    };
    const newAdmin = await this.adminModel.createAdmin(newAdminInfo);
    return newAdmin;
  }

  // 로그인
  async createAdminInfo(loginInfo) {
    const { email, password } = loginInfo;

    const admin = await this.adminModel.findByEmail(email);
    if (!admin) {
      throw new CustomError(
        401,
        'email 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
      );
    }
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      throw new CustomError(
        401,
        'email 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.',
      );
    }

    const accessToken = jwt.sign(
      { userId: admin.id, role: admin.userType },
      config.jwt.accessSecret,
      { expiresIn: config.jwt.accessExpiresIn },
    );

    return { accessToken, userId: admin.id, userType: admin.userType };
  }
}

export const adminService = new AdminService(adminModel);
