import SenseService from "../services/SenseService.js";
import exceptions from "../config/exceptions.js";
import getMAC from "getmac";

class SenseController {
  static getSense = async (req, res, next) => {
    try {
      const text = req.body.text;
      const sense = await SenseService.getSense(text)
      res.status(200).send(sense);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}

export default SenseController;
