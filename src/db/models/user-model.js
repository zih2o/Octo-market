import { model } from 'mongoose';
import { usersSchema } from '../schemas/user-schema';
import { createVirtualId } from '..';

createVirtualId(usersSchema);
const User = model('users', usersSchema);

export class UsersModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async createUser(userInfo) {
    const createdNewUser = await new User(userInfo).save();
    return createdNewUser;
  }

  async update({ userId, update }) {
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      update,
      option,
    );
    return updatedUser;
  }

  async remove(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

export const usersModel = new UsersModel();
