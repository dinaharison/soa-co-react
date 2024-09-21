require("dotenv").config();
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const UserRepository = require("../database/models/user-repository");

/**
 * this route is used to authenticate a user
 */
router.post("/", async (request, response) => {
  /**
   * we query the database if the user exists or not
   */
  const user = await UserRepository.findOneUserAsync(request.body.username);

  /**
   * if the user doesnt exist
   * sends a response with a 400 status code
   */
  if (!user) {
    response.status(400).send(
      JSON.stringify({
        isLoggedIn: false,
        message: `Cannot find User with provided username : ${request.body.username}`,
      })
    );
    return;
  }

  /**
   * if the user exists
   * compare the provided password
   * with the encrypted one inside the database
   */
  const isPasswordValid = await UserRepository.comparePasswordsAsync(
    user.password,
    request.body.password
  );

  /**
   * if the password is valid
   * we provide a refreshed token to allow
   * the user to access its data
   *
   * the token is then stored into a cookie
   * and passed to the client side
   */
  if (isPasswordValid) {
    const token = jwt.sign({ username: user.username }, process.env.JWTSECRET, {
      expiresIn: parseInt(process.env.JWTEXPIRATION),
    });

    response.cookie("token", token, {
      maxAge: parseInt(process.env.JWTEXPIRATION) * 100,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return response.status(200).send(
      JSON.stringify({
        isLoggedIn: true,
        message: `Authenticated as ${user.username}`,
        username: user.username,
        token,
      })
    );
  } else {
    /**
     * if passwords doesnt match
     * notifies the user by sending a 403 status
     */
    response.status(403).send(
      JSON.stringify({
        isLoggedIn: false,
        message: "Provided credentials are invalid",
      })
    );
  }
});

module.exports = router;
