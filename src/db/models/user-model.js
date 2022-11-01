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

  // eslint-disable-next-line class-methods-use-this
  async createUser(userInfo) {
    const createdNewUser = await new User(userInfo).save();
    return createdNewUser;
  }

  async update({ userId, update }) {
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(userId, update, option);
    return updatedUser;
  }

  async removeUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

const usersModel = new UsersModel();

export { usersModel };
