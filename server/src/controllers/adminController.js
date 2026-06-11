import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Transaction from "../models/Transaction.js";

export async function adminOverview(req, res, next) {
  try {
    const [users, stocks, transactions] = await Promise.all([
      User.countDocuments(),
      Stock.countDocuments({ active: true }),
      Transaction.countDocuments()
    ]);

    res.json({ users, stocks, transactions });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
}
