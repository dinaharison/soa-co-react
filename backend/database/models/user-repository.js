const User = require("./user");
const bcrypt = require("bcrypt");
const SALT = 13;

/**
 * finds a user based on a username (username is unique)
 * @param {*} username string holding the username to be seached
 * @returns a Promise
 */
const findOneUserAsync = async (username) => {
  return await User.findOne({
    where: { username: username },
  });
};

/**
 * create a new user and persist it on the database
 * @param {*} username string containing the username
 * @param {*} password string containing the password
 * @returns a Promise
 */
const createUserAsync = async (username, password) => {
  return await User.create({
    username: username,
    password: await encryptPasswordAsync(password),
  });
};

/**
 * encrypt the password, using bcrypt library
 * @param {*} password string containing the password to be encrypted
 * @returns a Promise
 */
const encryptPasswordAsync = async (password) => {
  return await bcrypt.hash(password, SALT);
};

/**
 * compares encrypted password and plain text password, using bcrypt
 * @param {*} encryptedPassword string containing the encrypted password
 * @param {*} password string containing plain text password from the client
 * @returns a boolean
 */
const comparePasswordsAsync = async (encryptedPassword, password) => {
  return await bcrypt.compare(password, encryptedPassword);
};

module.exports = {
  findOneUserAsync,
  createUserAsync,
  encryptPasswordAsync,
  comparePasswordsAsync,
};
