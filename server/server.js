import app from "./app.js";
import configurations from "./config/config.js";
/**
 * Retrieves the port from the configuration and starts the server.
 */
const port = configurations.port;

if (configurations.isDocker) {
  console.log("Running in a Docker container");
} else {
  console.log("Run on User OS");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
