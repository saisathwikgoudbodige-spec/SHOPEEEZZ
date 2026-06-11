import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!user) {
      setPortfolio({ cashBalance: 100000, totalValue: 100000, holdings: [] });
      return;
    }

    Promise.all([api.get("/portfolio"), api.get("/trades")])
      .then(([portfolioResponse, tradeResponse]) => {
        setPortfolio(portfolioResponse.data);
        setTransactions(tradeResponse.data);
      })
      .catch(() => {
        setPortfolio({ cashBalance: 100000, totalValue: 100000, holdings: [] });
        setTransactions([]);
      });
  }, [user]);

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Portfolio</p>
          <h1>Track balance, holdings, and trading activity.</h1>
          {!user && <p><Link to="/login">Login</Link> to load your protected portfolio data.</p>}
        </div>
        <div className="dashboard-grid">
          <article className="panel">
            <span>Cash Balance</span>
            <strong>${Number(portfolio?.cashBalance || 0).toFixed(2)}</strong>
          </article>
          <article className="panel">
            <span>Total Value</span>
            <strong>${Number(portfolio?.totalValue || portfolio?.cashBalance || 0).toFixed(2)}</strong>
          </article>
          <article className="panel">
            <span>Holdings</span>
            <strong>{portfolio?.holdings?.length || 0}</strong>
          </article>
        </div>
        <section className="table-panel mt-4">
          <h2>Recent Transactions</h2>
          <div className="table-responsive">
            <table className="table table-dark table-striped align-middle">
              <thead>
                <tr><th>Stock</th><th>Type</th><th>Quantity</th><th>Total</th></tr>
              </thead>
              <tbody>
                {transactions.length === 0 && <tr><td colSpan="4">No transactions yet.</td></tr>}
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.stock?.symbol || "Stock"}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                    <td>${Number(transaction.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
