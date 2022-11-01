import { userService } from "../services";

const signup = async (req, res, next) => {
  const { name, email, password, phoneNum, address, userType } = req.body
  try{
    const newUser = await userService.createUser({ name, email, password, phoneNum, address, userType })

    res.status(201).json(newUser)
  }catch(err){
    next(err)
  }
}

export { signup }