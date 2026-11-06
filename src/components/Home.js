import React from "react";
import "./Home.css";

import Summary from "./Summary";
import Holdings from "./Holdings";
import Positions from "./Positions";
import WatchList from "./WatchList";
import MarketOverview from "./MarketOverview";
import QuickActions from "./QuickActions";

function Home({ onOpenBuySell, onNavigate, fundsData, positionsData }) {
  const todayDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="home-dashboard">
      <div className="home-welcome-header">
        <div className="welcome-left">
          <h1>Hi, Sayan 👋</h1>
          <p className="welcome-subtitle">
            Here is your live portfolio overview for today, <span className="today-date">{todayDate}</span>.
          </p>
        </div>

        <div className="welcome-right">
          <div className="market-session-badge">
            <span className="pulse-indicator"></span>
            <span>NSE/BSE Market Open</span>
          </div>
        </div>
      </div>

      {/* Summary Cards (Equity & Commodity Margins) */}
      <Summary onNavigate={onNavigate} fundsData={fundsData} />

      {/* Portfolio Holdings Summary */}
      <Holdings
        isSummary={true}
        onNavigate={onNavigate}
        onOpenBuySell={onOpenBuySell}
      />

      {/* Active Positions & Watchlist Side-by-Side */}
      <div className="trading-section-grid">
        <Positions
          isSummary={true}
          onNavigate={onNavigate}
          onOpenBuySell={onOpenBuySell}
          positionsData={positionsData}
        />
        <WatchList onOpenBuySell={onOpenBuySell} />
      </div>

      {/* Live Market Overview & Charts */}
      <MarketOverview />

      {/* Quick Access Tools */}
      <QuickActions onNavigate={onNavigate} onOpenBuySell={onOpenBuySell} />
    </div>
  );
}

export default Home;
