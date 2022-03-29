const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  email;
  passwordHash;
  

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHashed = row.password_hash;

  }

  static async insert({ email, passwordHashed }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          users (email, password_hash)
          VALUES
          ($1, $2)
          RETURNING 
          *
          `,
      [email, passwordHashed]
    );
    return new User(rows[0]);
  }
};

