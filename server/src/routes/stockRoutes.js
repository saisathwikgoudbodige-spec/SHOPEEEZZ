import { Router } from "express";
import { getStock, listStocks, refreshMarket } from "../controllers/stockController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, listStocks);
router.get("/refresh", protect, refreshMarket);
router.get("/:id", protect, getStock);

export default router;
