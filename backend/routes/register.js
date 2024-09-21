var express = require("express");
var router = express.Router();
const UserRepository = require("../database/models/user-repository");

/**
 * this route is used to register a new user
 */
router.post("/", async (request, response) => {
  try {
    /**
     * Since the username is unique
     * first check if the user already has an account
     * by querying the database
     */
    const isExistingUser = await UserRepository.findOneUserAsync(
      request.body.username
    );

    /**
     * if the user already has an account
     * notifies the client side with a 400 status
     */
    if (isExistingUser) {
      response.status(400).send(
        JSON.stringify({
          message: `Provided username : ${request.body.username} is already taken`,
        })
      );
      return;
    }

    /**
     * if the user doesnt have an account
     * create a new row on the database
     * with a username and a hashed password
     *
     * a response is then sent to the user
     */
    return await UserRepository.createUserAsync(
      request.body.username,
      request.body.password
    ).then(() => {
      response.status(201).send(
        JSON.stringify({
          message: `You can now log in as ${request.body.username}`,
        })
      );
    });
  } catch (error) {
    /**
     * if somehow encryption failed or the database
     * fails to register the user
     * it will send an error with a 500 code
     */
    response
      .status(500)
      .send(JSON.stringify({ message: "Something went wrong" }));
  }
});

module.exports = router;
