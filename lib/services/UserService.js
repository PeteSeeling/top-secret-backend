const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  
  static async create({ email, password }) {
    
    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await User.insert({ 
      email,
      passwordHashed: hashedPassword  });
    
    return user;
  }

  static async signIn({ email, password }) {

    const user = await User.findByEmail(email);

    if (!user) throw new Error('invalid email/password');
  
    const matchedPasswords = bcrypt.compareSync(password, user.hashedPassword);
   

    if (!matchedPasswords) throw new Error('invalid email/password');
    

    return user;
  }
};
