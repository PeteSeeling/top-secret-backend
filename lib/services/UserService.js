const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  
  static async create({ email, password }) {
    try{
      const hashedPassword = bcrypt.hashSync(
        password,
        Number(`${process.env.SALT_ROUNDS}`)
      );
   
      return User.insert({
        email,
        hashedPassword,
      });

    } catch (error){
      error.status = 401;
      throw error;
    }
  }

  static async signIn({ email, password }) {
    try{
      const user = await User.findByEmail(email);

      if (!user) throw new Error('invalid email/password');
  
      const matchedPasswords = bcrypt.compareSync(password, user.passwordHash);
   
      if (!matchedPasswords) throw new Error('invalid email/password');
    
      return user;
    }catch(error){
      error.status = 401;
      throw error;
    }
  }};
