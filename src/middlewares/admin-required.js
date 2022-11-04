import jwt from 'jsonwebtoken';
import { adminModel } from '../db';

const adminRequired = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json({ message: 'Authentication Error' });
  }

  const adminToken = authHeader.split(' ')[1];

  // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
  // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
  if (!adminToken || adminToken === 'null') {
    console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
    return res.status(403).json({
      result: 'forbidden-approach',
      reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
    });
  }

  // 해당 token 이 정상적인 token인지 확인
  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(adminToken, secretKey);

    const adminId = jwtDecoded.adminId;

    const admin = await adminModel.findById(adminId);
    if (!admin) {
      return res.status(401).json({
        result: 'not found from users collection',
        message: '회원정보를 찾을 수 없습니다.',
      });
    }

    req.currentAdminId = admin.id; // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
    req.userType = 'admin';
    next();
  } catch (error) {
    // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
    return res.status(403).json({
      result: 'forbidden-approach',
      reason: '정상적인 토큰이 아닙니다.',
    });
  }
};

export { adminRequired };
