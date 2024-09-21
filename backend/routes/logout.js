var express = require("express");
const authenticationMiddleware = require("../middlewares/authentication-middleware");
var router = express.Router();

/**
 * this endpoint is used to sign out the user
 * by deleting the token
 *
 * a response is then sent to the user
 */
router.post("/", authenticationMiddleware, (request, response) => {
  response.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  response.send(
    JSON.stringify({ message: `User: ${request.username} logged out` })
  );
});

module.exports = router;
