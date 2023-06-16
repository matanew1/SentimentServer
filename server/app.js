import express from "express";

// Create an Express application
const app = express();

// Import middleware functions and user routes
import middlewares from "./middlewares/middlewares.js";
import SenseRoute from "./routes/SenseRoute.js";

app.use(middlewares); // Use middleware functions
app.use("/", SenseRoute); // Mount senses routes to the application

export default app;
