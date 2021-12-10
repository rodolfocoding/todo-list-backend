const User = require("../model/User");
const generateHash = require("../helpers/crypt");
const { ErrorHandler } = require("../helpers/error");

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
  async create(name, email, password) {
    try {
      if (
        name == "" ||
        name == null ||
        password == "" ||
        password == null ||
        email == "" ||
        email == null
      ) {
        throw new ErrorHandler(400, "Fill in all fields");
      }

      const userExists = await User.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        throw new ErrorHandler(400, "User already exists");
      }

      const passwordHash = generateHash(password);

      const user = (
        await User.create({
          name,
          email,
          password: passwordHash,
        })
      ).get({
        plain: true,
      });

      return user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UserRepository();
