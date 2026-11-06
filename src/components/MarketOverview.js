import React, { useState } from "react";
import "./MarketOverview.css";

function MarketOverview() {
  const [selectedIndex, setSelectedIndex] = useState("NIFTY 50");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  const indexData = {
    "NIFTY 50": {
      current: "24,148.20",
      change: "+124.60 (+0.52%)",
      isUp: true,
      open: "24,080.15",
      high: "24,195.40",
      low: "24,025.10",
      prevClose: "24,023.60",
      fiftyTwoHigh: "26,277.35",
      fiftyTwoLow: "18,837.85",
      chartPoints: [
        { x: 0, y: 110 },
        { x: 40, y: 120 },
        { x: 80, y: 95 },
        { x: 120, y: 130 },
        { x: 160, y: 105 },
        { x: 200, y: 80 },
        { x: 240, y: 85 },
        { x: 280, y: 60 },
        { x: 320, y: 70 },
        { x: 360, y: 45 },
        { x: 400, y: 35 },
        { x: 440, y: 40 },
        { x: 480, y: 20 },
      ],
    },
    "SENSEX": {
      current: "79,486.32",
      change: "+388.10 (+0.49%)",
      isUp: true,
      open: "79,210.40",
      high: "79,640.80",
      low: "79,150.20",
      prevClose: "79,098.22",
      fiftyTwoHigh: "85,978.25",
      fiftyTwoLow: "63,583.07",
      chartPoints: [
        { x: 0, y: 100 },
        { x: 40, y: 115 },
        { x: 80, y: 90 },
        { x: 120, y: 110 },
        { x: 160, y: 95 },
        { x: 200, y: 75 },
        { x: 240, y: 65 },
        { x: 280, y: 55 },
        { x: 320, y: 60 },
        { x: 360, y: 40 },
        { x: 400, y: 30 },
        { x: 440, y: 35 },
        { x: 480, y: 15 },
      ],
    },
    "NIFTY BANK": {
      current: "51,215.80",
      change: "-82.40 (-0.16%)",
      isUp: false,
      open: "51,340.00",
      high: "51,480.60",
      low: "51,080.20",
      prevClose: "51,298.20",
      fiftyTwoHigh: "54,467.35",
      fiftyTwoLow: "42,105.40",
      chartPoints: [
        { x: 0, y: 40 },
        { x: 40, y: 35 },
        { x: 80, y: 55 },
        { x: 120, y: 50 },
        { x: 160, y: 75 },
        { x: 200, y: 70 },
        { x: 240, y: 90 },
        { x: 280, y: 85 },
        { x: 320, y: 100 },
        { x: 360, y: 115 },
        { x: 400, y: 105 },
        { x: 440, y: 120 },
        { x: 480, y: 125 },
      ],
    },
  };

  const current = indexData[selectedIndex];
  const strokeColor = current.isUp ? "#159447" : "#df514c";
  const gradientColor = current.isUp ? "#159447" : "#df514c";

  // Build SVG path
  const pointsStr = current.chartPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPointsStr = `0,160 ${pointsStr} 480,160`;

  return (
    <section className="market-section">
      <div className="market-card">
        <div className="market-card-header">
          <div className="market-header-info">
            <div className="index-title-row">
              <h2>{selectedIndex}</h2>
              <span className="live-badge">● LIVE</span>
            </div>
            <div className="market-current-row">
              <span className="market-price-big">{current.current}</span>
              <span className={`market-change-badge ${current.isUp ? "up" : "down"}`}>
                {current.change}
              </span>
            </div>
          </div>

          <div className="market-controls">
            <div className="index-selector-pills">
              {Object.keys(indexData).map((idx) => (
                <button
                  key={idx}
                  className={`idx-pill ${selectedIndex === idx ? "active" : ""}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  {idx}
                </button>
              ))}
            </div>

            <div className="timeframe-pills">
              {["1D", "1W", "1M", "1Y"].map((tf) => (
                <button
                  key={tf}
                  className={`tf-pill ${selectedTimeframe === tf ? "active" : ""}`}
                  onClick={() => setSelectedTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic SVG Interactive Chart */}
        <div className="market-chart-container">
          <svg viewBox="0 0 480 160" className="market-svg-chart" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${selectedIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={gradientColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={gradientColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="40" x2="480" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeDasharray="3 3" />

            {/* Area Fill */}
            <polygon points={areaPointsStr} fill={`url(#grad-${selectedIndex})`} />

            {/* Main Trend Line */}
            <polyline
              points={pointsStr}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="chart-time-labels">
            <span>09:15 AM</span>
            <span>11:00 AM</span>
            <span>01:00 PM</span>
            <span>03:30 PM</span>
          </div>
        </div>

        <div className="market-stats-footer">
          <div className="stat-pill-item">
            <span>Open</span>
            <strong>{current.open}</strong>
          </div>
          <div className="stat-pill-item">
            <span>Prev. Close</span>
            <strong>{current.prevClose}</strong>
          </div>
          <div className="stat-pill-item">
            <span>Day High</span>
            <strong className="profit">{current.high}</strong>
          </div>
          <div className="stat-pill-item">
            <span>Day Low</span>
            <strong className="loss">{current.low}</strong>
          </div>
          <div className="stat-pill-item">
            <span>52W High</span>
            <strong>{current.fiftyTwoHigh}</strong>
          </div>
          <div className="stat-pill-item">
            <span>Market Status</span>
            <strong className="status-open">● Open (Closes 3:30 PM)</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketOverview;
