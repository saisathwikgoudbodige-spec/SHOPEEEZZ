import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="hero">
      <div className="container hero-grid">
        <section>
          <p className="eyebrow">MERN Stock Trading Platform</p>
          <h1>Explore markets, simulate trades, and track your portfolio.</h1>
          <p className="hero-copy">
            SHOPEEEZZ helps investors browse stocks, review market movement, execute virtual buy and sell trades, and manage holdings from one responsive dashboard.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Link className="btn btn-primary btn-lg" to="/market">Open Market</Link>
            <Link className="btn btn-outline-light btn-lg" to="/portfolio">View Portfolio</Link>
          </div>
        </section>
        <section className="metric-panel">
          <div>
            <span>Virtual Balance</span>
            <strong>$100,000</strong>
          </div>
          <div>
            <span>Core Modules</span>
            <strong>Auth, Market, Trades, Admin</strong>
          </div>
          <div>
            <span>Security</span>
            <strong>JWT + Role Access</strong>
          </div>
        </section>
      </div>
    </main>
  );
}
