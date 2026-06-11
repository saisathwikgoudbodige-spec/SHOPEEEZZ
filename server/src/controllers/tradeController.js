import Portfolio from "../models/Portfolio.js";
import Stock from "../models/Stock.js";
import Transaction from "../models/Transaction.js";

export async function executeTrade(req, res, next) {
  try {
    const { stockId, type, quantity } = req.body;
    const tradeQuantity = Number(quantity);

    if (!stockId || !["BUY", "SELL"].includes(type) || !Number.isInteger(tradeQuantity) || tradeQuantity < 1) {
      res.status(400);
      throw new Error("Valid stockId, type, and quantity are required");
    }

    const stock = await Stock.findById(stockId);
    if (!stock || !stock.active) {
      res.status(404);
      throw new Error("Stock not found");
    }

    const portfolio = await Portfolio.findOne({ user: req.user._id }) || await Portfolio.create({ user: req.user._id });
    const total = Number((stock.price * tradeQuantity).toFixed(2));
    const holding = portfolio.holdings.find((item) => item.stock.toString() === stock._id.toString());

    if (type === "BUY") {
      if (portfolio.cashBalance < total) {
        res.status(400);
        throw new Error("Insufficient virtual balance");
      }

      portfolio.cashBalance = Number((portfolio.cashBalance - total).toFixed(2));
      if (holding) {
        const currentCost = holding.quantity * holding.averageBuyPrice;
        holding.quantity += tradeQuantity;
        holding.averageBuyPrice = Number(((currentCost + total) / holding.quantity).toFixed(2));
      } else {
        portfolio.holdings.push({ stock: stock._id, quantity: tradeQuantity, averageBuyPrice: stock.price });
      }
    }

    if (type === "SELL") {
      if (!holding || holding.quantity < tradeQuantity) {
        res.status(400);
        throw new Error("Not enough shares to sell");
      }

      holding.quantity -= tradeQuantity;
      portfolio.cashBalance = Number((portfolio.cashBalance + total).toFixed(2));
      portfolio.holdings = portfolio.holdings.filter((item) => item.quantity > 0);
    }

    await portfolio.save();
    const transaction = await Transaction.create({
      user: req.user._id,
      stock: stock._id,
      type,
      quantity: tradeQuantity,
      price: stock.price,
      total
    });

    res.status(201).json({ transaction, portfolio });
  } catch (error) {
    next(error);
  }
}

export async function listTransactions(req, res, next) {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).populate("stock").sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
}
