var express = require("express");
var router = express.Router();
var authMiddleware = require("../middlewares/authenticationMiddleware");

/**
 * example of protected route
 * by adding a second parameter to the route
 *
 * the authMiddleware is used to verify the user
 * and will chain its request to the demanded route
 */
router.get("/", authMiddleware, (request, response) => {
  response.send(JSON.stringify({ username: request.username }));
});

module.exports = router;
