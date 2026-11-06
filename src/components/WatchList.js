import React, { useState } from "react";
import "./WatchList.css";

function WatchList({ onOpenBuySell }) {
  const [activeTab, setActiveTab] = useState(1);
  const [marketDepthStock, setMarketDepthStock] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const watchlistData = {
    1: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries",
        exchange: "NSE",
        price: 2890.5,
        change: 35.5,
        percent: 1.24,
        isUp: true,
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        exchange: "NSE",
        price: 3412.2,
        change: -15.4,
        percent: -0.45,
        isUp: false,
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Ltd",
        exchange: "NSE",
        price: 1745.2,
        change: 14.2,
        percent: 0.82,
        isUp: true,
      },
      {
        symbol: "INFY",
        name: "Infosys Ltd",
        exchange: "NSE",
        price: 1482.6,
        change: -10.15,
        percent: -0.68,
        isUp: false,
      },
      {
        symbol: "ITC",
        name: "ITC Ltd",
        exchange: "NSE",
        price: 438.25,
        change: 1.85,
        percent: 0.42,
        isUp: true,
      },
      {
        symbol: "TATAMOTORS",
        name: "Tata Motors Ltd",
        exchange: "NSE",
        price: 978.3,
        change: 20.6,
        percent: 2.15,
        isUp: true,
      },
    ],
    2: [
      { symbol: "SBIN", name: "State Bank of India", exchange: "NSE", price: 812.9, change: -1.8, percent: -0.22, isUp: false },
      { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE", price: 1120.4, change: 15.5, percent: 1.4, isUp: true },
      { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", exchange: "NSE", price: 1780.0, change: -5.0, percent: -0.28, isUp: false },
      { symbol: "AXISBANK", name: "Axis Bank", exchange: "NSE", price: 1195.0, change: 12.0, percent: 1.01, isUp: true },
    ],
    3: [
      { symbol: "NIFTY 24MAY 24200 CE", name: "Nifty Call Option", exchange: "NFO", price: 145.2, change: 25.0, percent: 20.8, isUp: true },
      { symbol: "NIFTY 24MAY 24000 PE", name: "Nifty Put Option", exchange: "NFO", price: 82.5, change: -32.0, percent: -27.9, isUp: false },
    ],
  };

  const stocks = watchlistData[activeTab] || watchlistData[1];
  const filteredStocks = stocks.filter((s) =>
    s.symbol.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="watchlist-card">
      <div className="watchlist-top">
        <div className="watchlist-header">
          <div>
            <h2>Watchlist</h2>
            <span>Your tracked instruments</span>
          </div>
          <span className="watchlist-counter">{stocks.length} / 50</span>
        </div>

        <div className="watchlist-tabs-bar">
          <div className="watchlist-tabs">
            {[1, 2, 3, 4, 5].map((tabNum) => (
              <button
                key={tabNum}
                className={`wl-tab-btn ${activeTab === tabNum ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tabNum);
                  setMarketDepthStock(null);
                }}
              >
                {tabNum}
              </button>
            ))}
          </div>

          <div className="wl-search-wrap">
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="watchlist-items-list">
        {filteredStocks.map((stock) => (
          <div key={stock.symbol} className="watchlist-item-row">
            <div className="wl-stock-left">
              <span className="wl-stock-symbol">{stock.symbol}</span>
              <span className="wl-stock-exchange">{stock.exchange}</span>
            </div>

            <div className="wl-hover-actions">
              <button
                className="wl-action-btn buy"
                title="Buy"
                onClick={() => onOpenBuySell && onOpenBuySell(stock, "BUY")}
              >
                B
              </button>
              <button
                className="wl-action-btn sell"
                title="Sell"
                onClick={() => onOpenBuySell && onOpenBuySell(stock, "SELL")}
              >
                S
              </button>
              <button
                className="wl-action-btn depth"
                title="Market Depth"
                onClick={() =>
                  setMarketDepthStock(
                    marketDepthStock?.symbol === stock.symbol ? null : stock
                  )
                }
              >
                ⋯
              </button>
            </div>

            <div className="wl-stock-right">
              <span className="wl-stock-price">₹{stock.price.toFixed(2)}</span>
              <span className={`wl-stock-change ${stock.isUp ? "profit" : "loss"}`}>
                {stock.isUp ? "+" : ""}{stock.percent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {marketDepthStock && (
        <div className="market-depth-drawer">
          <div className="depth-header">
            <strong>Market Depth - {marketDepthStock.symbol}</strong>
            <button
              className="depth-close"
              onClick={() => setMarketDepthStock(null)}
            >
              ✕
            </button>
          </div>

          <div className="depth-grid">
            <div className="depth-bids">
              <div className="depth-table-head">
                <span>Orders</span>
                <span>Qty</span>
                <span>Bid (Buy)</span>
              </div>
              <div className="depth-table-row bid">
                <span>12</span>
                <span>2,450</span>
                <span>{(marketDepthStock.price - 0.5).toFixed(2)}</span>
              </div>
              <div className="depth-table-row bid">
                <span>8</span>
                <span>1,200</span>
                <span>{(marketDepthStock.price - 1.0).toFixed(2)}</span>
              </div>
              <div className="depth-table-row bid">
                <span>15</span>
                <span>4,100</span>
                <span>{(marketDepthStock.price - 1.5).toFixed(2)}</span>
              </div>
              <div className="depth-total bid-total">
                <span>Total: 7,750</span>
              </div>
            </div>

            <div className="depth-offers">
              <div className="depth-table-head">
                <span>Ask (Sell)</span>
                <span>Qty</span>
                <span>Orders</span>
              </div>
              <div className="depth-table-row ask">
                <span>{(marketDepthStock.price + 0.5).toFixed(2)}</span>
                <span>1,800</span>
                <span>9</span>
              </div>
              <div className="depth-table-row ask">
                <span>{(marketDepthStock.price + 1.0).toFixed(2)}</span>
                <span>3,250</span>
                <span>14</span>
              </div>
              <div className="depth-table-row ask">
                <span>{(marketDepthStock.price + 1.5).toFixed(2)}</span>
                <span>2,100</span>
                <span>11</span>
              </div>
              <div className="depth-total ask-total">
                <span>Total: 7,150</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchList;
