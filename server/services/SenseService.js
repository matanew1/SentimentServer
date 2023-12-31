const Sense = require("../models/senseSchema.js");
const Summary = require("../models/summarySchema.js");
const exceptions = require("../config/exceptions.js");
const { spawn } = require("child_process");
const path = require("path");
const { fileURLToPath } = require("url");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

class SenseService {
  static runGenerateSenseByText = (fullPath, text) => {
    return new Promise((resolve, reject) => {
      const python = spawn("python", [fullPath, text]);

      python.stdout.on("data", (data) => {
        console.log("Pipe data = require(python script ...");
        const dataToSend = data.toString();
        resolve(dataToSend);
      });

      python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        reject(new Error(`Python process closed with code ${code}`));
      });

      python.on("error", (error) => {
        console.error("Error occurred while spawning Python process:", error);
        reject(error);
      });
    });
  };

  static runGenerateSummaryByText = (fullPath, text, min, max) => {
    return new Promise((resolve, reject) => {
      var python;
      if (min !== undefined && max !== undefined)
        python = spawn("python", [fullPath, text, min, max]);
      else python = spawn("python", [fullPath, text]);

      python.stdout.on("data", (data) => {
        console.log("Pipe data from python script ...");
        const dataToSend = data.toString();
        resolve(dataToSend);
      });

      python.on("close", (code) => {
        console.log(`child process close all stdio with code ${code}`);
        reject(new Error(`Python process closed with code ${code}`));
      });

      python.on("error", (error) => {
        console.error("Error occurred while spawning Python process:", error);
        reject(error);
      });
    });
  };

  static getSummary = async (text, min, max) => {
    try {
      const fullPath = path.join(__dirname, "..", "scripts/summarize_text.py");
      const dataToSend = await this.runGenerateSummaryByText(
        fullPath,
        text,
        min,
        max
      );

      if (dataToSend) {
        const summary = new Summary({ text: dataToSend });
        return await summary.save();
      }
    } catch (error) {
      throw new Error(`Failed to get summary`, error);
    }
  };

  static getSense = async (text) => {
    try {
      const fullPath = path.join(
        __dirname,
        "..",
        "scripts/sentiment_decision.py"
      );
      const dataToSend = await this.runGenerateSenseByText(fullPath, text);
      if (dataToSend) {
        const fixedDataForParse = dataToSend.replace(/'/g, '"');
        const sense = new Sense(JSON.parse(fixedDataForParse));
        return await sense.save();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  static getResults = async () => {
    try {
      return await Sense.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  static removeResult = async (id) => {
    try {
      await Sense.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  static setFavorite = async (id) => {
    try {
      const result = await Sense.findById(id);
      result.favorite = !result.favorite;
      await result.save();
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = SenseService;
