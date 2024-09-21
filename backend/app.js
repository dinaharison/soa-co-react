/**
 * This is the main program file, the core of the server.
 * This is where everything takes place.
 * From configuring existing routes(urls), database connections and other configurations
 */

const express = require("express");
const cors = require("cors");
const sequelize = require("./database/config");
const coockieParser = require("cookie-parser");
const getCorsOptions = require("./middlewares/cors-configuration-middleware");
var bodyparser = require("body-parser");

/**
 * Initializing the Server
 */
const app = express();

/**
 * Initializing the database
 */
sequelize
  .sync()
  .then(() => console.log("database ready"))
  .catch((erros) => console.log(erros.message));

/**
 * Server configuration :
 * CORS configuration limits who can access to the backend's functionnalities
 */
app.use(bodyparser.json());

/**
 * configure CORS
 */

//TODO: still have some CORS problems
app.use(
  cors({
    origin: getCorsOptions,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(coockieParser());

/**
 * Defining routes :
 * the login route is used to sign in an existing user
 * the register route is used to create an account
 * user route is a protected route, we need to log in to access the route
 */
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const userRoute = require("./routes/index");
const logoutRoute = require("./routes/logout");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/user", userRoute);
app.use("/logout", logoutRoute);

/**
 * "app" is exported as it is used to run the server with
 * previously defined configurations.
 * to run the server, the command "npm start" points to "./bin/www"
 * which contains several data such as the server port and eventual error handling functions
 */
module.exports = app;
