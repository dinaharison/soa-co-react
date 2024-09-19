var express = require("express");
const authenticationMiddleware = require("../middlewares/authenticationMiddleware");
var router = express.Router();

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
