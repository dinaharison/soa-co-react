require("dotenv").config();
var express = require("express");
var router = express.Router();
const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (request, response) => {
  const user = await User.findOne({
    where: { username: request.body.username },
  });

  if (!user) {
    response
      .status(400)
      .send(
        JSON.stringify({ isLoggedIn: false, message: "User does not exist" })
      );
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
  );

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
    response.status(403).send(
      JSON.stringify({
        isLoggedIn: false,
        message: "Invalid login",
      })
    );
  }
});

module.exports = router;
