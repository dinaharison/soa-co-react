const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (request, response, next) => {
  console.log(request.cookies.token);

  const authHeader = !request.cookies.token
    ? request.headers.authorization
    : request.cookies.token;

  if (!authHeader) {
    return response.status(401).send(
      JSON.stringify({
        isLoggedIn: false,
        message: "You have to provide a token",
      })
    );
  }

  try {
    const data = jwt.verify(authHeader, process.env.JWTSECRET);
    request.username = data.username;
  } catch (error) {
    return response
      .status(401)
      .send({ isLoggedIn: false, message: "invalid or expired Token" });
  }
  next();
};
