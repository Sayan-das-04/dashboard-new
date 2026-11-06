import React from "react";
import "./QuickActions.css";

function QuickActions({ onNavigate, onOpenBuySell }) {
  const actions = [
    {
      id: "funds",
      title: "Add Funds",
      desc: "Instant UPI & Netbanking transfer",
      icon: "+",
      actionText: "Deposit →",
      onClick: () => onNavigate && onNavigate("funds"),
    },
    {
      id: "orders",
      title: "View Orders",
      desc: "Check active & executed trades",
      icon: "◷",
      actionText: "Open →",
      onClick: () => onNavigate && onNavigate("orders"),
    },
    {
      id: "bids",
      title: "IPO & Bids",
      desc: "Apply for trending mainboard IPOs",
      icon: "🎯",
      actionText: "Apply →",
      onClick: () => onNavigate && onNavigate("bids"),
    },
    {
      id: "apps",
      title: "Finora Apps",
      desc: "Access Console, Coin & Varsity",
      icon: "🧩",
      actionText: "Explore →",
      onClick: () => onNavigate && onNavigate("apps"),
    },
  ];

  return (
    <section className="quick-actions-section">
      <div className="section-header">
        <div>
          <h2>Quick Actions</h2>
          <span>Shortcuts to essential trading tools</span>
        </div>
      </div>

      <div className="quick-actions-grid">
        {actions.map((act) => (
          <div
            key={act.id}
            className="quick-action-card"
            onClick={act.onClick}
          >
            <div className="quick-action-icon">{act.icon}</div>
            <div className="quick-action-info">
              <h3>{act.title}</h3>
              <p>{act.desc}</p>
            </div>
            <button className="quick-action-btn">{act.actionText}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
