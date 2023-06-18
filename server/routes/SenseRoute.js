import { Router } from "express";
const router = Router();
import SenseController from "../controllers/SenseContorller.js";
import configuration from "../config/config.js";
import cors from "cors";

const corsOptions = configuration.corsOptions;
router.options("/sense", cors(corsOptions));

router.post("/sense", cors(corsOptions), SenseController.getSense);
router.post("/summary", cors(corsOptions), SenseController.getSummary);
router.get("/results", cors(corsOptions), SenseController.getResults);
router.delete("/results/delete/:id", cors(corsOptions), SenseController.removeResult);
router.put("/results/update/:id", cors(corsOptions), SenseController.setFavorite);

export default router;
