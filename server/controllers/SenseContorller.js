import SenseService from "../services/SenseService.js";
import exceptions from "../config/exceptions.js";

/**
 *
 *
 * @class SenseController
 */
class SenseController {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof SenseController
   */
  static getSense = async (req, res) => {
    try {
      const text = req.body.text;
      const sense = await SenseService.getSense(text)
      res.status(200).send(sense);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  static getResults = async (req, res) => {
    try {
      const results = await SenseService.getResults();
      res.status(200).send(results);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  static removeResult = async (req, res) => {
    try {
      const id = req.params.id;
      await SenseService.removeResult(id);
      res.status(200).json({ message: 'Removed successfully'})
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}

export default SenseController;
