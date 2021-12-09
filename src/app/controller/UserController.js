const repository = require("../repository/UserRepository");

class UserController {
  async index(req, res) {
    const users = await repository.getAll();

    return res.json(users);
  }
}

module.exports = new UserController();
