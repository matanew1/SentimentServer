const { Router } = require("express");
const router = Router();
const SenseController = require("../controllers/SenseContorller.js");
const configuration = require("../config/config.js");
const cors = require("cors");

const corsOptions = configuration.corsOptions;
router.options("/sense", cors(corsOptions));

router.post("/sense", cors(corsOptions), SenseController.getSense);
router.post("/summary", cors(corsOptions), SenseController.getSummary);
router.get("/results", cors(corsOptions), SenseController.getResults);
router.delete(
  "/results/delete/:id",
  cors(corsOptions),
  SenseController.removeResult
);
router.put(
  "/results/update/:id",
  cors(corsOptions),
  SenseController.setFavorite
);

module.exports = router;
