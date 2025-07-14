const bcrypt = require ('bcrypt');

const saltRounds = 10;

const createHash = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const isValidPassword = (user, plainPassword) => {
  return bcrypt.compareSync(plainPassword, user.password);
};

module.exports = {
  createHash,
  isValidPassword
};