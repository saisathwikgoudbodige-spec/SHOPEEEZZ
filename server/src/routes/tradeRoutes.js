import { Router } from "express";
import { executeTrade, listTransactions } from "../controllers/tradeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, executeTrade);
router.get("/", protect, listTransactions);

export default router;
