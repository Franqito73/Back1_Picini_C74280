const UserModel = require ('../models/user.model.js');

class UsersDAO {
  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async getById(id) {
    return await UserModel.findById(id);
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async update(id, updatedFields) {
    return await UserModel.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

module.exports = new UsersDAO();