const bcrypt = require('bcryptjs');

module.exports = async function encryptPassword(password) {
  return bcrypt.hashSync(password, 12);
};
