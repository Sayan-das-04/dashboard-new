import React, { useState } from "react";
import "./Menu.css";

function Menu({
  activeTab,
  setActiveTab,
  ordersCount = 3,
  positionsCount = 2,
}) {
  // Sidebar states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      badge: ordersCount,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
    },
    {
      id: "holdings",
      label: "Holdings",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      id: "positions",
      label: "Positions",
      badge: positionsCount,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
    },
    {
      id: "bids",
      label: "Bids",
      badgeText: "IPO",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
    },
    {
      id: "funds",
      label: "Funds",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
      ),
    },
    {
      id: "apps",
      label: "Apps",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Toggler */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`menu ${isCollapsed ? "collapsed" : ""} ${
          isMobileOpen ? "open" : ""
        }`}
      >
        {/* Header */}
        <div className="menu-header">
          <div className="menu-logo">
            <img
              style={{ height: "40px", width: "40px" }}
              src="/Logo.png"
              alt="FINORA Logo"
            />
            <span className="logo-text">FINORA</span>
          </div>

          {/* Desktop Collapse Button */}
          <button
            className="sidebar-collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Collapse sidebar"
          >
            {isCollapsed ? "»" : "«"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="menu-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                className={`menu-link ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
              >
                <span className="menu-icon">{item.icon}</span>

                <span className="menu-label">{item.label}</span>

                {item.badge !== undefined && (
                  <span className="menu-badge">{item.badge}</span>
                )}

                {item.badgeText && (
                  <span className="menu-badge-text">{item.badgeText}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="menu-bottom">
          <div className="user-profile-widget">
            <div className="user-avatar">S</div>

            <div className="user-details">
              <span className="user-name">Sayan Das</span>
              <span className="user-client-id">FD8892 • Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Menu;
