const express = require("express"); // using express

// Create an Express application
const app = express();

// Import middleware functions and user routes
const middlewares = require("./middlewares/middlewares.js");
const SenseRoute = require("./routes/SenseRoute.js");

app.use(middlewares); // Use middleware functions
app.use("/", SenseRoute); // Mount senses routes to the application

module.exports = app;
