const SenseService = require("../services/SenseService.js");
const exceptions = require("../config/exceptions.js");

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
      const sense = await SenseService.getSense(text);
      res.status(200).send(sense);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  static getSummary = async (req, res) => {
    try {
      const text = req.body.text;
      const { min, max } = req.query;
      const summary = await SenseService.getSummary(text, min, max);
      res.status(200).send(summary);
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
      res.status(200).json({ message: "Removed successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  static setFavorite = async (req, res) => {
    try {
      const id = req.params.id;
      await SenseService.setFavorite(id);
      res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}

module.exports = SenseController;
