import Stock from "../models/Stock.js";
import { applyPriceMovement } from "../services/marketService.js";

export async function listStocks(req, res, next) {
  try {
    const search = req.query.search?.trim();
    const filter = { active: true };

    if (search) {
      filter.$or = [
        { symbol: new RegExp(search, "i") },
        { name: new RegExp(search, "i") }
      ];
    }

    const stocks = await Stock.find(filter).sort({ symbol: 1 });
    res.json(stocks);
  } catch (error) {
    next(error);
  }
}

export async function getStock(req, res, next) {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }
    res.json(stock);
  } catch (error) {
    next(error);
  }
}

export async function refreshMarket(req, res, next) {
  try {
    const stocks = await Stock.find({ active: true });
    const updated = await Promise.all(stocks.map((stock) => applyPriceMovement(stock).save()));
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

export async function createStock(req, res, next) {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    next(error);
  }
}

export async function updateStock(req, res, next) {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }
    res.json(stock);
  } catch (error) {
    next(error);
  }
}

export async function deleteStock(req, res, next) {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!stock) {
      res.status(404);
      throw new Error("Stock not found");
    }
    res.json({ message: "Stock disabled", stock });
  } catch (error) {
    next(error);
  }
}
