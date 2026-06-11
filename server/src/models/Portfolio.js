import mongoose from "mongoose";

const holdingSchema = new mongoose.Schema(
  {
    stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
    quantity: { type: Number, required: true, min: 0 },
    averageBuyPrice: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    cashBalance: { type: Number, default: 100000 },
    holdings: [holdingSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
