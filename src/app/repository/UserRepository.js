const User = require("../model/User");

class UserRepository {
  async getAll() {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "password",
          "createdAt",
          "updatedAt",
        ],
        raw: true,
      });

      const filterUser = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      return filterUser;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();
