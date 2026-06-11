import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Admin() {
  const { isAdmin } = useAuth();
  const [overview, setOverview] = useState({ users: 0, stocks: 0, transactions: 0 });
  const [message, setMessage] = useState("Admin API requires an ADMIN token.");

  useEffect(() => {
    if (!isAdmin) {
      setMessage("Login as admin to load protected platform stats.");
      return;
    }

    api.get("/admin/overview")
      .then((response) => {
        setOverview(response.data);
        setMessage("Admin overview loaded.");
      })
      .catch(() => setMessage("Admin data could not be loaded. Check backend and token."));
  }, [isAdmin]);

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Moderate users, stocks, and transactions.</h1>
          <p>{message}</p>
          {!isAdmin && <Link className="btn btn-primary" to="/login">Admin Login</Link>}
        </div>
        <div className="dashboard-grid">
          <article className="panel"><span>Users</span><strong>{overview.users}</strong></article>
          <article className="panel"><span>Active Stocks</span><strong>{overview.stocks}</strong></article>
          <article className="panel"><span>Transactions</span><strong>{overview.transactions}</strong></article>
        </div>
      </div>
    </main>
  );
}
