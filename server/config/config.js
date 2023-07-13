/**
 * Configuration object for the application.
 */
const configuration = {
  isDocker: process.env.DOCKER === "true",
  port: 8080,
  uri: `mongodb://${
    process.env.DOCKER === "true" ? "database" : "127.0.0.1"
  }:27017/TextAnalysisDB`,
  json_path: "./tests/utils/",
  corsOptions: {
    origin: `http://localhost:3000`,
    credentials: true,
  },
};

module.exports = configuration;
