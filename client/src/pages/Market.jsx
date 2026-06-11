import React from "react";
import { useEffect, useMemo, useState } from "react";
import api from "../api.js";
import StockCard from "../components/StockCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { demoStocks } from "../demoData.js";

export default function Market() {
  const { user } = useAuth();
  const [stocks, setStocks] = useState(demoStocks);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Demo data is shown until the API is connected.");

  useEffect(() => {
    if (!user) {
      setMessage("Login to load protected live stock data and execute trades.");
      return;
    }

    api.get("/stocks")
      .then((response) => {
        setStocks(response.data);
        setMessage("Live API data loaded.");
      })
      .catch(() => setMessage("Demo data is shown until the backend and MongoDB are running."));
  }, [user]);

  const filteredStocks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return stocks;
    return stocks.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query));
  }, [search, stocks]);

  async function handleTrade(stock, type) {
    if (!user) {
      setMessage("Please login before placing trades.");
      return;
    }

    try {
      const quantity = Number(prompt(`Enter quantity to ${type.toLowerCase()} for ${stock.symbol}:`, "1"));
      if (!quantity) return;
      await api.post("/trades", { stockId: stock._id, type, quantity });
      setMessage(`${type} order completed for ${quantity} share(s) of ${stock.symbol}.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Trade could not be completed.");
    }
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-heading market-heading">
          <div>
            <p className="eyebrow">Market Dashboard</p>
            <h1>Browse stocks and simulate trades.</h1>
            <p>{message}</p>
          </div>
          <input
            className="search-input"
            placeholder="Search by symbol or company"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="stock-grid">
          {filteredStocks.map((stock) => (
            <StockCard key={stock._id || stock.symbol} stock={stock} onTrade={handleTrade} />
          ))}
        </div>
      </div>
    </main>
  );
}
