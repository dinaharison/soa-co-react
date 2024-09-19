const User = require("../models/user");
const SALT = 13;

const findUser = async (username) => {
  return await User.findOne({
    where: { username: username },
  });
};

const createUser = async (username, password) => {
  return (
    new Promise(async () => {
      return User.create({
        username: username,
        password: await hashPassword(password),
      });
    }),
    (error) => {
      return `Failled to create the user ${error}`;
    }
  );
};

const compareEncryptedPassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT);
};

module.exports = {
  findUser,
  createUser,
  compareEncryptedPassword,
  hashPassword,
};
