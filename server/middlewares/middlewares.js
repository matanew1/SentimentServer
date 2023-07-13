const { json, urlencoded } = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configuration = require("../config/config.js");

/**
 * Middleware functions for request body parsing and CORS handling.
 * @type {Array<Function>} - An array of middleware functions.
 */
const corsOptions = configuration.corsOptions;
const middlewares = [
  json(),
  urlencoded({ extended: true }),
  cors(corsOptions),
  cookieParser(),
];

module.exports = middlewares;
