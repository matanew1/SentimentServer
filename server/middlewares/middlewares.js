import { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import configuration from "../config/config.js";

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

export default middlewares;
