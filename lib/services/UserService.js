const bcrypt = require('bcryptjs');
const User = require('..models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHashed = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.insert({
      email,
      passwordHashed
    });
  }
};
