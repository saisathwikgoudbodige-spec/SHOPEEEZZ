import Portfolio from "../models/Portfolio.js";
import Stock from "../models/Stock.js";

export async function getPortfolio(req, res, next) {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id }).populate("holdings.stock");
    if (!portfolio) {
      const created = await Portfolio.create({ user: req.user._id });
      return res.json(created);
    }

    const holdingsValue = portfolio.holdings.reduce((sum, holding) => {
      return sum + holding.quantity * (holding.stock?.price || 0);
    }, 0);

    res.json({
      ...portfolio.toObject(),
      holdingsValue,
      totalValue: portfolio.cashBalance + holdingsValue
    });
  } catch (error) {
    next(error);
  }
}

export async function getSummary(req, res, next) {
  try {
    const totalStocks = await Stock.countDocuments({ active: true });
    const portfolio = await Portfolio.findOne({ user: req.user._id }).populate("holdings.stock");
    res.json({
      totalStocks,
      cashBalance: portfolio?.cashBalance || 0,
      holdingCount: portfolio?.holdings.length || 0
    });
  } catch (error) {
    next(error);
  }
}
