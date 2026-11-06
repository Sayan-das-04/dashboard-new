import React from "react";
import "./Apps.css";

function Apps({ onShowToast }) {
  const finoraApps = [
    {
      id: "console",
      name: "FINORA Console",
      category: "Reporting & Tax",
      desc: "Detailed tradebook, tax P&L statements, corporate actions, and portfolio analytics.",
      badge: "Official",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#387ed1"
          strokeWidth="2"
        >
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
    },
    {
      id: "coin",
      name: "FINORA Coin",
      category: "Direct Mutual Funds",
      desc: "Invest in zero-commission direct mutual funds with automated weekly or monthly SIPs.",
      badge: "Popular",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#159447"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"></path>
          <path d="M12 6v2m0 8v2"></path>
        </svg>
      ),
    },
    {
      id: "sentinel",
      name: "FINORA Sentinel",
      category: "Price Alerts",
      desc: "Cloud-based price and technical indicator alerts sent directly to your phone & email.",
      badge: "Realtime",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#d97706"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
    },
    {
      id: "kiteconnect",
      name: "Kite Connect API",
      category: "Developer Suite",
      desc: "Build algorithmic trading strategies and automated execution bots with clean HTTP REST APIs.",
      badge: "Devs",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366f1"
          strokeWidth="2"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      id: "varsity",
      name: "FINORA Varsity",
      category: "Education",
      desc: "Comprehensive modules covering fundamentals, technical analysis, futures & options for all levels.",
      badge: "Free",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
    },
    {
      id: "smallcase",
      name: "Smallcase Portfolios",
      category: "Thematic Investing",
      desc: "Discover diversified modern baskets of stocks and ETFs based on economic themes and models.",
      badge: "Partner",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ec4899"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="apps-page-container">
      <div className="apps-header">
        <div>
          <h2>FINORA Apps Ecosystem</h2>
          <p>
            Supercharge your trading and investing with specialized tools and
            integrations.
          </p>
        </div>
      </div>

      <div className="apps-grid">
        {finoraApps.map((app) => (
          <div key={app.id} className="app-card">
            <div className="app-card-top">
              <div className="app-icon-wrap">{app.icon}</div>
              <span className="app-badge">{app.badge}</span>
            </div>

            <div className="app-content">
              <span className="app-cat">{app.category}</span>
              <h3>{app.name}</h3>
              <p>{app.desc}</p>
            </div>

            <button
              className="btn-launch-app"
              onClick={() => {
                if (onShowToast)
                  onShowToast(`Launching ${app.name}...`, "info");
              }}
            >
              Launch App →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Apps;
