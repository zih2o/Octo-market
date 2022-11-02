import { usersModel } from "../db";

const adminRequired = async(req, res, next) => {
    try {
        const userId = req.currentUserId
        const user = usersModel.findById(userId)
        if (!user || user.userType != 'admin'){
            return res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자가 아닙니다.',
              })
        }
        req.userType = 'admin'
        next()
    } catch(err) {
            next(err)
    }
}

export { adminRequired }
