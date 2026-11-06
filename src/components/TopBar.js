import React, { useState } from "react";
import "./TopBar.css";

function TopBar({ onOpenBuySell, onSelectStock }) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const searchableStocks = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2890.5, change: "+1.2%", isUp: true, exchange: "NSE" },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3412.2, change: "-0.4%", isUp: false, exchange: "NSE" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1745.2, change: "+0.8%", isUp: true, exchange: "NSE" },
    { symbol: "INFY", name: "Infosys Ltd", price: 1482.6, change: "-0.6%", isUp: false, exchange: "NSE" },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1120.4, change: "+1.4%", isUp: true, exchange: "NSE" },
    { symbol: "TATAMOTORS", name: "Tata Motors Ltd", price: 978.3, change: "+2.1%", isUp: true, exchange: "NSE" },
    { symbol: "ITC", name: "ITC Ltd", price: 438.25, change: "+0.4%", isUp: true, exchange: "NSE" },
    { symbol: "SBIN", name: "State Bank of India", price: 812.9, change: "-0.2%", isUp: false, exchange: "NSE" },
  ];

  const filteredStocks = searchQuery.trim()
    ? searchableStocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableStocks;

  const notifications = [
    { id: 1, title: "Order Executed", text: "Buy 10 RELIANCE @ 2,890.50 executed on NSE", time: "10 mins ago", type: "success" },
    { id: 2, title: "Dividend Credited", text: "₹450 dividend credited for TCS Holdings", time: "2 hours ago", type: "info" },
    { id: 3, title: "Market Alert", text: "NIFTY crossed 24,100 resistance mark", time: "3 hours ago", type: "warning" },
  ];

  return (
    <header className="topbar">
      <div className="topbar-market-indices">
        <div className="market-item">
          <span className="market-name">NIFTY 50</span>
          <strong className="market-value">24,148.20</strong>
          <span className="market-change up">+124.60 (+0.52%)</span>
        </div>

        <div className="market-divider"></div>

        <div className="market-item">
          <span className="market-name">SENSEX</span>
          <strong className="market-value">79,486.32</strong>
          <span className="market-change up">+388.10 (+0.49%)</span>
        </div>

        <div className="market-divider"></div>

        <div className="market-item">
          <span className="market-name">NIFTY BANK</span>
          <strong className="market-value">51,215.80</strong>
          <span className="market-change down">-82.40 (-0.16%)</span>
        </div>
      </div>

      <div className="topbar-search-container">
        <div
          className="search-box-trigger"
          onClick={() => setShowSearchModal(true)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="search-placeholder">Search eg: infy, bse, nifty...</span>
          <span className="search-shortcut">Ctrl+K</span>
        </div>

        {showSearchModal && (
          <div className="search-dropdown-menu">
            <div className="search-input-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Search stocks, futures, options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="search-close-btn"
                onClick={() => setShowSearchModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="search-results-list">
              {filteredStocks.map((stock) => (
                <div key={stock.symbol} className="search-result-item">
                  <div className="stock-info">
                    <span className="stock-sym">{stock.symbol}</span>
                    <span className="stock-exchange">{stock.exchange}</span>
                    <span className="stock-full-name">{stock.name}</span>
                  </div>
                  <div className="stock-actions">
                    <span className={`stock-live-price ${stock.isUp ? "up" : "down"}`}>
                      ₹{stock.price.toFixed(2)}
                    </span>
                    <button
                      className="quick-buy-btn"
                      onClick={() => {
                        setShowSearchModal(false);
                        onOpenBuySell && onOpenBuySell(stock, "BUY");
                      }}
                    >
                      B
                    </button>
                    <button
                      className="quick-sell-btn"
                      onClick={() => {
                        setShowSearchModal(false);
                        onOpenBuySell && onOpenBuySell(stock, "SELL");
                      }}
                    >
                      S
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="topbar-actions">
        <div className="notification-wrapper">
          <button
            className="topbar-icon-btn"
            onClick={() => {
              setShowNotificationModal(!showNotificationModal);
              setShowUserDropdown(false);
            }}
            title="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-dot"></span>
          </button>

          {showNotificationModal && (
            <div className="notification-flyout">
              <div className="flyout-header">
                <h4>Notifications</h4>
                <span className="mark-all-read">Mark all as read</span>
              </div>
              <div className="flyout-body">
                {notifications.map((n) => (
                  <div key={n.id} className="notification-card">
                    <span className="notif-title">{n.title}</span>
                    <p className="notif-text">{n.text}</p>
                    <span className="notif-time">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="profile-wrapper">
          <div
            className="profile-pill"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotificationModal(false);
            }}
          >
            <div className="profile-circle">S</div>
            <span className="profile-handle">FD8892</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {showUserDropdown && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-user-header">
                <strong>Sayan Das</strong>
                <span>sayandas@finora.in</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">My Profile & Settings</div>
              <div className="dropdown-item">Console (Backoffice)</div>
              <div className="dropdown-item">Coin (Mutual Funds)</div>
              <div className="dropdown-item">Support Portal</div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item danger">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
