const UsersDAO = require('../dao/UserDAO');

class UsersRepository {
  async getUserByEmail(email) {
    return await UsersDAO.getByEmail(email);
  }

  async getUserById(id) {
    return await UsersDAO.getById(id);
  }

  async createUser(userData) {
    return await UsersDAO.create(userData);
  }

  async updateUser(id, updatedFields) {
    return await UsersDAO.update(id, updatedFields);
  }

  async deleteUser(id) {
    return await UsersDAO.delete(id);
  }
}

module.exports = new UsersRepository();

