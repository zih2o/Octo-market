import { model } from 'mongoose';
import { adminSchema } from '../schemas/admin-schema';
import { createVirtualId } from '..';

createVirtualId(adminSchema);
const Admin = model('admins', adminSchema);

export class AdminModel {
  async findById(admin_id) {
    const admin = await Admin.findOne({ _id: admin_id });
    return admin;
  }

  async findByEmail(email) {
    const admin = await Admin.findOne({ email });
    return admin;
  }

  async createAdmin(adminInfo) {
    const createdNewAdmin = await new Admin(adminInfo).save();
    return createdNewAdmin;
  }
}

export const adminModel = new AdminModel();
