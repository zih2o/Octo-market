import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { usersModel } from '../db';
import { adminModel } from '../db';

dotenv.config();

const loginRequired = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: 'Authentication Error' });
  }

  const userToken = authHeader.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!userToken || userToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    return res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;
    const user = await usersModel.findById(userId);
    const admin = await adminModel.findById(userId);

    if (user == null && admin == null) {
      return res.status(401).json({
        result: 'not found from users collection',
        message: '회원정보를 찾을 수 없습니다.',
      });
    }

    req.currentUserId = user != null ? user.id : admin.id;
    req.userType = user != null ? user.userType : admin.userType;
    next();
  } catch (error) {
    return res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
  }
};

export { loginRequired };
