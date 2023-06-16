import { Router } from "express";
const router = Router();
import SenseController from "../controllers/SenseContorller.js";
import configuration from "../config/config.js";
import cors from "cors";

const corsOptions = configuration.corsOptions;
router.options("/sense", cors(corsOptions));

router.post("/sense", cors(corsOptions), SenseController.getSense);

export default router;
