require("dotenv").config();
var express = require("express");
var router = express.Router();
const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * this route is used to authenticate a user
 */
router.post("/", async (request, response) => {
  /**
   * we query the database if the user exists or not
   */
  const user = await User.findOne({
    where: { username: request.body.username },
  });

  /**
   * if the user doesnt exist
   * sends a response with a 400 status code
   */
  if (!user) {
    response
      .status(400)
      .send(
        JSON.stringify({ isLoggedIn: false, message: "User does not exist" })
      );
    return;
  }

  /**
   * if the user exists
   * compare the provided password
   * with the encrypted one inside the database
   */
  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
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
        message: "Authenticated",
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
        message: "Invalid login",
      })
    );
  }
});

module.exports = router;
