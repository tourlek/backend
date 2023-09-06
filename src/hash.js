const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds for bcrypt

async function hashPassword(plainTextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
}

module.exports = { hashPassword };
