import React, { useState } from "react";
import "./DashBoard.css";

import Menu from "./Menu";
import TopBar from "./TopBar";
import Home from "./Home";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Bids from "./Bids";
import Funds from "./Funds";
import Apps from "./Apps";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Shared application state
  const [fundsData, setFundsData] = useState({
    equityAvailable: 142850.25,
    equityUsed: 24180.0,
    commodityAvailable: 45200.0,
    commodityUsed: 0.0,
  });

  const [orders, setOrders] = useState([
    {
      id: "ORD-101",
      time: "10:14:28",
      type: "BUY",
      instrument: "RELIANCE",
      exchange: "NSE",
      product: "CNC",
      qty: "10 / 10",
      price: 2890.5,
      status: "COMPLETE",
    },
    {
      id: "ORD-102",
      time: "11:22:15",
      type: "BUY",
      instrument: "TCS",
      exchange: "NSE",
      product: "MIS",
      qty: "5 / 5",
      price: 3412.2,
      status: "COMPLETE",
    },
    {
      id: "ORD-103",
      time: "12:05:40",
      type: "SELL",
      instrument: "INFY",
      exchange: "NSE",
      product: "MIS",
      qty: "0 / 15",
      price: 1495.0,
      status: "OPEN",
    },
  ]);

  const [positions, setPositions] = useState([
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
  ]);

  // Order Placement Window Modal
  const [orderModal, setOrderModal] = useState({
    isOpen: false,
    stock: null,
    mode: "BUY", // "BUY" | "SELL"
    product: "CNC", // "CNC" (Longterm) | "MIS" (Intraday)
    orderType: "MARKET", // "MARKET" | "LIMIT"
    qty: 1,
    price: 0,
  });

  // Notification Toast State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const openBuySell = (stock, mode = "BUY") => {
    setOrderModal({
      isOpen: true,
      stock,
      mode,
      product: "CNC",
      orderType: "MARKET",
      qty: 1,
      price: stock.price || 100,
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const { stock, mode, product, qty, price } = orderModal;
    const orderCost = qty * price;
    const currentTime = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      time: currentTime,
      type: mode,
      instrument: stock.symbol,
      exchange: stock.exchange || "NSE",
      product,
      qty: `${qty} / ${qty}`,
      price,
      status: "COMPLETE",
    };

    setOrders([newOrder, ...orders]);

    // If intraday or new position, update positions
    if (product === "MIS") {
      const existingPos = positions.find((p) => p.symbol === stock.symbol && p.status === "open");
      if (existingPos) {
        setPositions(
          positions.map((p) =>
            p.id === existingPos.id
              ? {
                  ...p,
                  qty: mode === "BUY" ? p.qty + qty : Math.max(0, p.qty - qty),
                }
              : p
          )
        );
      } else {
        const newPos = {
          id: `pos-${Date.now()}`,
          symbol: stock.symbol,
          name: stock.name || stock.symbol,
          product: "MIS",
          exchange: stock.exchange || "NSE",
          qty,
          buyAvg: price,
          ltp: price,
          pnl: 0,
          pnlPercent: 0,
          status: "open",
        };
        setPositions([newPos, ...positions]);
      }
    }

    // Update funds
    setFundsData((prev) => ({
      ...prev,
      equityUsed: prev.equityUsed + (mode === "BUY" ? orderCost : -orderCost),
    }));

    showToast(
      `Order Executed: ${mode} ${qty} ${stock.symbol} @ ₹${price.toFixed(2)} on ${stock.exchange || "NSE"}`,
      "success"
    );

    setOrderModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleUpdateFunds = (addedAmount) => {
    setFundsData((prev) => ({
      ...prev,
      equityAvailable: prev.equityAvailable + addedAmount,
    }));
  };

  return (
    <div className="dashboard">
      {/* Sidebar Navigation Menu */}
      <Menu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ordersCount={orders.length}
        positionsCount={positions.filter((p) => p.status === "open").length}
      />

      <div className="dashboard-main">
        {/* Top Header Bar */}
        <TopBar
          onOpenBuySell={openBuySell}
          onSelectStock={(stock) => openBuySell(stock, "BUY")}
        />

        {/* View Switcher Container */}
        <main className="dashboard-content">
          {activeTab === "dashboard" && (
            <Home
              onOpenBuySell={openBuySell}
              onNavigate={setActiveTab}
              fundsData={fundsData}
              positionsData={positions}
            />
          )}

          {activeTab === "orders" && (
            <Orders orders={orders} onOpenBuySell={openBuySell} />
          )}

          {activeTab === "holdings" && (
            <Holdings
              isSummary={false}
              onNavigate={setActiveTab}
              onOpenBuySell={openBuySell}
            />
          )}

          {activeTab === "positions" && (
            <Positions
              isSummary={false}
              onNavigate={setActiveTab}
              onOpenBuySell={openBuySell}
              positionsData={positions}
            />
          )}

          {activeTab === "bids" && <Bids onShowToast={showToast} />}

          {activeTab === "funds" && (
            <Funds
              fundsData={fundsData}
              onUpdateFunds={handleUpdateFunds}
              onShowToast={showToast}
            />
          )}

          {activeTab === "apps" && <Apps onShowToast={showToast} />}
        </main>
      </div>

      {/* Zerodha Kite Order Window Modal */}
      {orderModal.isOpen && orderModal.stock && (
        <div
          className="order-modal-backdrop"
          onClick={() => setOrderModal((prev) => ({ ...prev, isOpen: false }))}
        >
          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`order-modal-header ${
                orderModal.mode === "BUY" ? "buy" : "sell"
              }`}
            >
              <div className="order-modal-title">
                <h3>
                  {orderModal.mode} {orderModal.stock.symbol}
                </h3>
                <span className="order-modal-exchange">
                  {orderModal.stock.exchange || "NSE"}
                </span>
                <span className="order-modal-price">
                  ₹{orderModal.stock.price?.toFixed(2)}
                </span>
              </div>
              <button
                className="order-modal-close"
                onClick={() =>
                  setOrderModal((prev) => ({ ...prev, isOpen: false }))
                }
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit}>
              <div className="order-modal-body">
                {/* Buy vs Sell mode toggle */}
                <div className="order-type-switch">
                  <button
                    type="button"
                    className={`order-type-btn ${
                      orderModal.mode === "BUY" ? "active buy-active" : ""
                    }`}
                    onClick={() =>
                      setOrderModal((prev) => ({ ...prev, mode: "BUY" }))
                    }
                  >
                    BUY
                  </button>
                  <button
                    type="button"
                    className={`order-type-btn ${
                      orderModal.mode === "SELL" ? "active sell-active" : ""
                    }`}
                    onClick={() =>
                      setOrderModal((prev) => ({ ...prev, mode: "SELL" }))
                    }
                  >
                    SELL
                  </button>
                </div>

                {/* Segment Selector (Intraday vs Longterm) */}
                <div className="order-segment-tabs">
                  <button
                    type="button"
                    className={`segment-pill ${
                      orderModal.product === "CNC" ? "active" : ""
                    }`}
                    onClick={() =>
                      setOrderModal((prev) => ({ ...prev, product: "CNC" }))
                    }
                  >
                    Longterm (CNC)
                  </button>
                  <button
                    type="button"
                    className={`segment-pill ${
                      orderModal.product === "MIS" ? "active" : ""
                    }`}
                    onClick={() =>
                      setOrderModal((prev) => ({ ...prev, product: "MIS" }))
                    }
                  >
                    Intraday (MIS)
                  </button>
                </div>

                {/* Quantity and Price fields */}
                <div className="order-field-row">
                  <div className="order-field-group">
                    <label>Quantity</label>
                    <div className="order-input-wrap">
                      <button
                        type="button"
                        className="order-stepper-btn"
                        onClick={() =>
                          setOrderModal((prev) => ({
                            ...prev,
                            qty: Math.max(1, prev.qty - 1),
                          }))
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={orderModal.qty}
                        onChange={(e) =>
                          setOrderModal((prev) => ({
                            ...prev,
                            qty: Math.max(1, parseInt(e.target.value) || 1),
                          }))
                        }
                      />
                      <button
                        type="button"
                        className="order-stepper-btn"
                        onClick={() =>
                          setOrderModal((prev) => ({
                            ...prev,
                            qty: prev.qty + 1,
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="order-field-group">
                    <label>Price (₹)</label>
                    <div className="order-input-wrap">
                      <input
                        type="number"
                        step="0.05"
                        value={orderModal.price}
                        onChange={(e) =>
                          setOrderModal((prev) => ({
                            ...prev,
                            price: parseFloat(e.target.value) || 0,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Variety (Market vs Limit) */}
                <div className="order-variety-row">
                  <label>
                    <input
                      type="radio"
                      name="ordertype"
                      value="MARKET"
                      checked={orderModal.orderType === "MARKET"}
                      onChange={() =>
                        setOrderModal((prev) => ({
                          ...prev,
                          orderType: "MARKET",
                        }))
                      }
                    />
                    Market
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="ordertype"
                      value="LIMIT"
                      checked={orderModal.orderType === "LIMIT"}
                      onChange={() =>
                        setOrderModal((prev) => ({
                          ...prev,
                          orderType: "LIMIT",
                        }))
                      }
                    />
                    Limit
                  </label>
                </div>
              </div>

              <div className="order-modal-footer">
                <div className="order-margin-info">
                  <span>Margin required:</span>
                  <strong>
                    ₹
                    {(orderModal.qty * orderModal.price).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <div className="order-modal-actions">
                  <button
                    type="button"
                    className="order-cancel-btn"
                    onClick={() =>
                      setOrderModal((prev) => ({ ...prev, isOpen: false }))
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`order-submit-btn ${
                      orderModal.mode === "BUY" ? "buy" : "sell"
                    }`}
                  >
                    {orderModal.mode}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Kite Toast Notification */}
      {toast.show && (
        <div className={`dashboard-toast ${toast.type}`}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {toast.type === "success" ? (
              <polyline points="20 6 9 17 4 12"></polyline>
            ) : (
              <circle cx="12" cy="12" r="10"></circle>
            )}
          </svg>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
