import { Router } from "express";
import { getPortfolio, getSummary } from "../controllers/portfolioController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, getPortfolio);
router.get("/summary", protect, getSummary);

export default router;
