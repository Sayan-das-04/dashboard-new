import React, { useState } from "react";
import "./Positions.css";

function Positions({ isSummary = false, onNavigate, onOpenBuySell, positionsData: propPositions }) {
  const [activeSubTab, setActiveSubTab] = useState("open");

  const defaultPositions = [
    {
      id: "pos-1",
      symbol: "RELIANCE",
      name: "Reliance Industries",
      product: "MIS",
      exchange: "NSE",
      qty: 10,
      buyAvg: 2856.5,
      ltp: 2890.5,
      pnl: 340.0,
      pnlPercent: 1.19,
      status: "open",
    },
    {
      id: "pos-2",
      symbol: "TCS",
      name: "Tata Consultancy Services",
      product: "MIS",
      exchange: "NSE",
      qty: 5,
      buyAvg: 3437.3,
      ltp: 3412.2,
      pnl: -125.5,
      pnlPercent: -0.73,
      status: "open",
    },
    {
      id: "pos-3",
      symbol: "BANKNIFTY 24MAY 51000 CE",
      name: "Bank Nifty Call Option",
      product: "NRML",
      exchange: "NFO",
      qty: 15,
      buyAvg: 185.0,
      ltp: 214.5,
      pnl: 442.5,
      pnlPercent: 15.95,
      status: "open",
    },
    {
      id: "pos-4",
      symbol: "INFY",
      name: "Infosys Ltd",
      product: "MIS",
      exchange: "NSE",
      qty: 0,
      buyAvg: 1475.0,
      ltp: 1482.6,
      pnl: 152.0,
      pnlPercent: 1.03,
      status: "closed",
    },
  ];

  const positions = propPositions || defaultPositions;
  const openPositions = positions.filter((p) => p.status === "open");
  const closedPositions = positions.filter((p) => p.status === "closed");
  const currentList = activeSubTab === "open" ? openPositions : closedPositions;

  const totalPnl = openPositions.reduce((acc, curr) => acc + curr.pnl, 0);

  // If used in Home page as a preview card
  if (isSummary) {
    return (
      <div className="trading-card">
        <div className="trading-card-header">
          <div>
            <h2>Positions</h2>
            <span>Active intraday & derivative trades</span>
          </div>
          <div className="positions-count-badge">{openPositions.length} Open</div>
        </div>

        <div className="positions-list">
          {openPositions.slice(0, 3).map((pos) => (
            <div key={pos.id} className="position-row">
              <div className="pos-meta">
                <div className="pos-name-tag">
                  <strong>{pos.symbol}</strong>
                  <span className="product-badge">{pos.product}</span>
                </div>
                <span className="pos-detail">
                  {pos.exchange} • {pos.qty} Qty @ ₹{pos.buyAvg.toFixed(2)}
                </span>
              </div>

              <div className="position-price">
                <strong className="pos-ltp">₹{pos.ltp.toFixed(2)}</strong>
                <span className={pos.pnl >= 0 ? "profit" : "loss"}>
                  {pos.pnl >= 0 ? "+" : ""}₹{pos.pnl.toFixed(2)} ({pos.pnlPercent >= 0 ? "+" : ""}{pos.pnlPercent}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="positions-card-footer">
          <div className="footer-pnl">
            <span>Day's MTM:</span>
            <strong className={totalPnl >= 0 ? "profit" : "loss"}>
              {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toFixed(2)}
            </strong>
          </div>
          <button
            className="view-positions-link"
            onClick={() => onNavigate && onNavigate("positions")}
          >
            Manage positions →
          </button>
        </div>
      </div>
    );
  }

  // Full Page View
  return (
    <div className="positions-full-page">
      <div className="positions-header-banner">
        <div className="banner-left">
          <h2>Positions ({openPositions.length})</h2>
          <div className="subtabs-nav">
            <button
              className={`subtab-btn ${activeSubTab === "open" ? "active" : ""}`}
              onClick={() => setActiveSubTab("open")}
            >
              Open ({openPositions.length})
            </button>
            <button
              className={`subtab-btn ${activeSubTab === "closed" ? "active" : ""}`}
              onClick={() => setActiveSubTab("closed")}
            >
              Closed ({closedPositions.length})
            </button>
          </div>
        </div>

        <div className="banner-right">
          <div className="banner-pnl-stat">
            <span>Total Unrealized P&L</span>
            <strong className={totalPnl >= 0 ? "profit" : "loss"}>
              {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </strong>
          </div>
          {activeSubTab === "open" && openPositions.length > 0 && (
            <button className="square-all-btn">Square Off All</button>
          )}
        </div>
      </div>

      <div className="positions-table-wrap">
        <table className="positions-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Price</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg%</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map((pos) => (
              <tr key={pos.id}>
                <td>
                  <span className="product-badge">{pos.product}</span>
                </td>
                <td className="pos-instrument-col">
                  <strong>{pos.symbol}</strong>
                  <span className="exchange-sub">{pos.exchange}</span>
                </td>
                <td>{pos.qty}</td>
                <td>₹{pos.buyAvg.toFixed(2)}</td>
                <td className="ltp-cell">₹{pos.ltp.toFixed(2)}</td>
                <td className={pos.pnl >= 0 ? "profit" : "loss"}>
                  {pos.pnl >= 0 ? "+" : ""}₹{pos.pnl.toFixed(2)}
                </td>
                <td className={pos.pnlPercent >= 0 ? "profit" : "loss"}>
                  {pos.pnlPercent >= 0 ? "+" : ""}{pos.pnlPercent}%
                </td>
                <td>
                  {pos.status === "open" ? (
                    <div className="action-row">
                      <button
                        className="btn-exit"
                        onClick={() =>
                          onOpenBuySell &&
                          onOpenBuySell(
                            { symbol: pos.symbol, name: pos.name, price: pos.ltp, exchange: pos.exchange },
                            "SELL"
                          )
                        }
                      >
                        Exit
                      </button>
                      <button
                        className="btn-add"
                        onClick={() =>
                          onOpenBuySell &&
                          onOpenBuySell(
                            { symbol: pos.symbol, name: pos.name, price: pos.ltp, exchange: pos.exchange },
                            "BUY"
                          )
                        }
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <span className="closed-label">Closed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Positions;
