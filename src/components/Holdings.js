import React, { useState } from "react";
import "./Holdings.css";

function Holdings({ isSummary = false, onNavigate, onOpenBuySell }) {
  const [searchTerm, setSearchTerm] = useState("");

  const holdingsData = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      exchange: "NSE",
      sector: "Energy",
      qty: 25,
      avgCost: 2450.0,
      ltp: 2890.5,
      curVal: 72262.5,
      pnl: 11012.5,
      netChg: 17.98,
      dayChg: 1.24,
      isDayUp: true,
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      exchange: "NSE",
      sector: "IT",
      qty: 15,
      avgCost: 3200.0,
      ltp: 3412.2,
      curVal: 51183.0,
      pnl: 3183.0,
      netChg: 6.63,
      dayChg: -0.45,
      isDayUp: false,
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd",
      exchange: "NSE",
      sector: "Banking",
      qty: 30,
      avgCost: 1550.0,
      ltp: 1745.2,
      curVal: 52356.0,
      pnl: 5856.0,
      netChg: 12.59,
      dayChg: 0.82,
      isDayUp: true,
    },
    {
      symbol: "INFY",
      name: "Infosys Ltd",
      exchange: "NSE",
      sector: "IT",
      qty: 20,
      avgCost: 1380.0,
      ltp: 1482.6,
      curVal: 29652.0,
      pnl: 2052.0,
      netChg: 7.43,
      dayChg: -0.68,
      isDayUp: false,
    },
    {
      symbol: "TATAMOTORS",
      name: "Tata Motors Ltd",
      exchange: "NSE",
      sector: "Auto",
      qty: 12,
      avgCost: 780.0,
      ltp: 978.3,
      curVal: 11739.6,
      pnl: 2379.6,
      netChg: 25.42,
      dayChg: 2.15,
      isDayUp: true,
    },
  ];

  const totalInvestment = holdingsData.reduce((acc, curr) => acc + curr.avgCost * curr.qty, 0);
  const totalCurVal = holdingsData.reduce((acc, curr) => acc + curr.curVal, 0);
  const totalPnl = totalCurVal - totalInvestment;
  const totalPnlPercent = (totalPnl / totalInvestment) * 100;
  const dayPnl = 3420.5;

  const filteredHoldings = holdingsData.filter(
    (h) =>
      h.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If used in Dashboard Home page as a summary card
  if (isSummary) {
    return (
      <section className="holdings-section">
        <div className="section-header">
          <div>
            <h2>Holdings ({holdingsData.length})</h2>
            <span>Your long-term investment portfolio</span>
          </div>
          <button
            className="view-all-btn"
            onClick={() => onNavigate && onNavigate("holdings")}
          >
            View all holdings →
          </button>
        </div>

        <div className="holdings-card">
          <div className="holdings-summary-grid">
            <div className="stat-box">
              <span className="stat-title">Total P&L</span>
              <strong className="profit stat-large">
                +₹{totalPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
              <span className="stat-sub profit">+{totalPnlPercent.toFixed(2)}% overall</span>
            </div>

            <div className="stat-box">
              <span className="stat-title">Current Value</span>
              <strong className="stat-large">
                ₹{totalCurVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
              <span className="stat-sub">Real-time market value</span>
            </div>

            <div className="stat-box">
              <span className="stat-title">Total Investment</span>
              <strong className="stat-large">
                ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
              <span className="stat-sub">Across {holdingsData.length} stocks</span>
            </div>

            <div className="stat-box">
              <span className="stat-title">Day's P&L</span>
              <strong className="profit stat-large">
                +₹{dayPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
              <span className="stat-sub profit">+1.60% today</span>
            </div>
          </div>

          <div className="portfolio-progress">
            <div className="progress-labels">
              <span>Portfolio Allocation</span>
              <span>Banking (24%) • IT (37%) • Energy (33%) • Auto (6%)</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill energy" style={{ width: "33%" }} title="Energy 33%"></div>
              <div className="progress-fill it" style={{ width: "37%" }} title="IT 37%"></div>
              <div className="progress-fill banking" style={{ width: "24%" }} title="Banking 24%"></div>
              <div className="progress-fill auto" style={{ width: "6%" }} title="Auto 6%"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full Holdings Page View
  return (
    <div className="holdings-full-page">
      <div className="holdings-hero-bar">
        <div className="hero-stat-card">
          <span>Total Investment</span>
          <strong>₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="hero-stat-card">
          <span>Current Value</span>
          <strong>₹{totalCurVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="hero-stat-card">
          <span>Total P&L</span>
          <strong className="profit">
            +₹{totalPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (+{totalPnlPercent.toFixed(2)}%)
          </strong>
        </div>
        <div className="hero-stat-card">
          <span>Day's P&L</span>
          <strong className="profit">+₹{dayPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (+1.60%)</strong>
        </div>
      </div>

      <div className="holdings-table-container">
        <div className="table-toolbar">
          <div className="table-search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search instrument (e.g. INFY, TCS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <button className="btn-secondary">Download CSV</button>
            <button className="btn-secondary">Analytics</button>
          </div>
        </div>

        <table className="holdings-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map((stock) => (
              <tr key={stock.symbol}>
                <td className="instrument-col">
                  <strong>{stock.symbol}</strong>
                  <span className="exchange-sub">{stock.exchange} • {stock.sector}</span>
                </td>
                <td>{stock.qty}</td>
                <td>₹{stock.avgCost.toFixed(2)}</td>
                <td className="ltp-cell">₹{stock.ltp.toFixed(2)}</td>
                <td>₹{stock.curVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                <td className={stock.pnl >= 0 ? "profit" : "loss"}>
                  {stock.pnl >= 0 ? "+" : ""}₹{stock.pnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td className={stock.netChg >= 0 ? "profit" : "loss"}>
                  {stock.netChg >= 0 ? "+" : ""}{stock.netChg.toFixed(2)}%
                </td>
                <td className={stock.isDayUp ? "profit" : "loss"}>
                  {stock.isDayUp ? "+" : ""}{stock.dayChg.toFixed(2)}%
                </td>
                <td className="action-buttons-cell">
                  <button
                    className="stock-btn-buy"
                    onClick={() => onOpenBuySell && onOpenBuySell(stock, "BUY")}
                    title="Buy more"
                  >
                    B
                  </button>
                  <button
                    className="stock-btn-sell"
                    onClick={() => onOpenBuySell && onOpenBuySell(stock, "SELL")}
                    title="Exit / Sell"
                  >
                    S
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Holdings;
