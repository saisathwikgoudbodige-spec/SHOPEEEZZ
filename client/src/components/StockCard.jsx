import { Link } from "react-router-dom";

export default function StockCard({ stock, onTrade }) {
  const positive = stock.changePercent >= 0;

  return (
    <div className="stock-card">
      <div>
        <p className="stock-symbol">{stock.symbol}</p>
        <h3>{stock.name}</h3>
      </div>
      <div className="stock-meta">
        <strong>${Number(stock.price).toFixed(2)}</strong>
        <span className={positive ? "text-success" : "text-danger"}>
          {positive ? "+" : ""}{stock.changePercent}%
        </span>
      </div>
      <div className="d-flex gap-2 mt-3 flex-wrap">
        <Link className="btn btn-outline-light btn-sm" to={`/market/${stock._id}`}>Details</Link>
        <button className="btn btn-primary btn-sm" onClick={() => onTrade(stock, "BUY")}>Buy</button>
        <button className="btn btn-outline-light btn-sm" onClick={() => onTrade(stock, "SELL")}>Sell</button>
      </div>
    </div>
  );
}
