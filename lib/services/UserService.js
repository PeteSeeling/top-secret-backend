const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  
  static async create({ email, password }) {
    const passwordHashed = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    
    return User.insert({
      email,
      passwordHashed,
    });
   
  }

  static async signIn({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('invalid email/password');
console.log(user, ' ussssseeeeeerrrrrrrr');
    const matchedPasswords = bcrypt.compareSync(password, user.passwordHashed);
    if (!matchedPasswords) throw new Error('invalid email/password');

    return user;
  }
};
