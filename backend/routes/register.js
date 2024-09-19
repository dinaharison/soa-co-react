var express = require("express");
var router = express.Router();
var User = require("../database/models/user");
const bcrypt = require("bcrypt");
const SALT = 13;

router.post("/", async (request, response) => {
  try {
    const isExistingUser = await User.findOne({
      where: { username: request.body.username },
    });

    if (isExistingUser) {
      response
        .status(400)
        .send(JSON.stringify({ message: "The User already exist" }));
      return;
    }

    return await User.create({
      username: request.body.username,
      password: await bcrypt.hash(request.body.password, SALT),
    }).then(() => {
      response
        .status(201)
        .send(JSON.stringify({ message: "User created successfully" }));
    });
  } catch (error) {
    response
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong" }));
  }
});

module.exports = router;
