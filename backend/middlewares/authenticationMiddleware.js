const jwt = require("jsonwebtoken");
require("dotenv").config();
/**
 * this function is used to check user's identity
 * by checking the jwt token they provided through
 * the client side request
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns
 */
module.exports = (request, response, next) => {
  /**
   * checking if the token is provided
   * inside the cookie(in case of httpcookie)
   * or the request header
   */
  const authHeader = !request.cookies.token
    ? request.headers.authorization
    : request.cookies.token;

  /**
   * if no token is provided we notifie the user
   * by using a status code 401
   */
  if (!authHeader) {
    return response.status(401).send(
      JSON.stringify({
        isLoggedIn: false,
        message: "You have to provide a token",
      })
    );
  }

  /**
   * if a token is provided
   * verify if the token provided matches
   * a generated token for a user
   *
   * if the provided token doesn't match
   * notify the user by sending a 401 status code
   *
   * otherwise we provide data extracted from the token
   * to the request
   */
  try {
    const data = jwt.verify(authHeader, process.env.JWTSECRET);

    //we can use a database request here
    request.username = data.username;
  } catch (error) {
    return response
      .status(401)
      .send({ isLoggedIn: false, message: "invalid or expired Token" });
  }

  /**
   * IMPORTANT: this line will chain the request to other
   * routes, so we can provide data (extracted from the token)
   * to other routes
   */
  next();
};
