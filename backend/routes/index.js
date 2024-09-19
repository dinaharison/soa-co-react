var express = require("express");
var router = express.Router();
var authMiddleware = require("../middlewares/authenticationMiddleware");

router.get("/", authMiddleware, (request, response) => {
  response.send(JSON.stringify({ username: request.username }));
});

module.exports = router;
