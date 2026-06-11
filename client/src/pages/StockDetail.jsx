import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api.js";
import PriceChart from "../components/PriceChart.jsx";
import { demoStocks } from "../demoData.js";

export default function StockDetail() {
  const { id } = useParams();
  const [stock, setStock] = useState(() => demoStocks.find((item) => item._id === id) || demoStocks[0]);
  const [message, setMessage] = useState("Showing demo chart data until the API is connected.");

  useEffect(() => {
    api.get(`/stocks/${id}`)
      .then((response) => {
        setStock(response.data);
        setMessage("Live stock detail loaded.");
      })
      .catch(() => setMessage("Demo chart data is shown. Login and start the backend for live data."));
  }, [id]);

  return (
    <main className="page-section">
      <div className="container">
        <Link className="btn btn-outline-light btn-sm mb-4" to="/market">Back to Market</Link>
        <div className="section-heading">
          <p className="eyebrow">Stock Detail</p>
          <h1>{stock.symbol} - {stock.name}</h1>
          <p>{message}</p>
        </div>
        <div className="dashboard-grid">
          <article className="panel"><span>Current Price</span><strong>${Number(stock.price).toFixed(2)}</strong></article>
          <article className="panel"><span>Change</span><strong>{stock.changePercent >= 0 ? "+" : ""}{stock.changePercent}%</strong></article>
          <article className="panel"><span>Volume</span><strong>{Number(stock.volume || 0).toLocaleString()}</strong></article>
        </div>
        <section className="table-panel mt-4">
          <h2>Price Movement</h2>
          <PriceChart stock={stock} />
        </section>
      </div>
    </main>
  );
}
