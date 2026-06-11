import { Router } from "express";
import { adminOverview, listUsers } from "../controllers/adminController.js";
import { createStock, deleteStock, updateStock } from "../controllers/stockController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect, adminOnly);
router.get("/overview", adminOverview);
router.get("/users", listUsers);
router.post("/stocks", createStock);
router.put("/stocks/:id", updateStock);
router.delete("/stocks/:id", deleteStock);

export default router;
