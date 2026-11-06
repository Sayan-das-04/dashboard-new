import React from "react";
import "./Summary.css";

function Summary({ onNavigate, fundsData }) {
  const equityMargin = fundsData ? fundsData.equityAvailable : 142850.25;
  const equityUsed = fundsData ? fundsData.equityUsed : 24180.0;
  const openingBalance = equityMargin + equityUsed;

  const commodityMargin = fundsData ? fundsData.commodityAvailable : 45200.0;
  const commodityUsed = fundsData ? fundsData.commodityUsed : 0.0;
  const commodityOpening = commodityMargin + commodityUsed;

  return (
    <section className="summary-section">
      <div className="summary-grid">
        {/* Equity Card */}
        <div className="summary-card">
          <div className="summary-header">
            <div className="header-left">
              <span className="summary-title">Equity</span>
              <span className="summary-subtitle">NSE, BSE, F&O</span>
            </div>
            <div className="summary-icon equity-icon">₹</div>
          </div>

          <div className="summary-main-stat">
            <h2>₹{equityMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <span className="stat-label">Margin available</span>
          </div>

          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Margins used</span>
              <strong className="detail-value">
                ₹{equityUsed.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">Opening balance</span>
              <strong className="detail-value">
                ₹{openingBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </div>
          </div>

          <div className="summary-footer">
            <button
              className="summary-link-btn"
              onClick={() => onNavigate && onNavigate("funds")}
            >
              Add funds +
            </button>
            <button
              className="summary-link-subtle"
              onClick={() => onNavigate && onNavigate("funds")}
            >
              View statement →
            </button>
          </div>
        </div>

        {/* Commodity Card */}
        <div className="summary-card">
          <div className="summary-header">
            <div className="header-left">
              <span className="summary-title">Commodity</span>
              <span className="summary-subtitle">MCX</span>
            </div>
            <div className="summary-icon commodity-icon">◉</div>
          </div>

          <div className="summary-main-stat">
            <h2>₹{commodityMargin.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <span className="stat-label">Margin available</span>
          </div>

          <div className="summary-details">
            <div className="detail-item">
              <span className="detail-label">Margins used</span>
              <strong className="detail-value">
                ₹{commodityUsed.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">Opening balance</span>
              <strong className="detail-value">
                ₹{commodityOpening.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>
            </div>
          </div>

          <div className="summary-footer">
            <button
              className="summary-link-btn"
              onClick={() => onNavigate && onNavigate("funds")}
            >
              Add funds +
            </button>
            <button
              className="summary-link-subtle"
              onClick={() => onNavigate && onNavigate("funds")}
            >
              View statement →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
