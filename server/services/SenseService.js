import Sense from "../models/senseSchema.js";
import exceptions from "../config/exceptions.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SenseService {
  static runGenerateSenseByText = (fullPath, text) => {
    return new Promise((resolve, reject) => {
      const python = spawn("python", [fullPath, text]);

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

  static getSense = async (text) => {
    try {
      const fullPath = path.join(__dirname, "..", "scripts/sentiment_decision.py");
      const dataToSend = await this.runGenerateSenseByText(fullPath, text);
      if(dataToSend) {
        const fixedDataForParse = dataToSend.replace(/'/g, '"');
        const sense = new Sense(JSON.parse(fixedDataForParse));
        return await sense.save();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}


export default SenseService;
