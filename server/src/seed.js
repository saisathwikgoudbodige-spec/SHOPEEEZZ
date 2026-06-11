import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Stock from "./models/Stock.js";
import User from "./models/User.js";
import Portfolio from "./models/Portfolio.js";

dotenv.config();

await connectDB();

let admin = await User.findOne({ email: "admin@shopeeezz.local" });
if (!admin) {
  admin = await User.create({
    name: "Admin",
    email: "admin@shopeeezz.local",
    password: "admin123",
    role: "ADMIN"
  });
}

await Portfolio.findOneAndUpdate({ user: admin._id }, { user: admin._id }, { upsert: true });

await Stock.deleteMany({});
await Stock.insertMany([
  { symbol: "AAPL", name: "Apple Inc.", price: 195.42, change: 1.23, changePercent: 0.63, volume: 52000000 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 428.91, change: -2.14, changePercent: -0.5, volume: 31000000 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 178.32, change: 3.72, changePercent: 2.13, volume: 89000000 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 184.15, change: 0.85, changePercent: 0.46, volume: 45000000 }
]);

console.log("Seed complete. Admin login: admin@shopeeezz.local / admin123");
process.exit(0);
