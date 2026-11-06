import React, { useState } from "react";
import "./Orders.css";

function Orders({ orders: propOrders, onOpenBuySell }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const defaultOrders = [
    {
      id: "ord-101",
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
      id: "ord-102",
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
      id: "ord-103",
      time: "12:05:40",
      type: "SELL",
      instrument: "INFY",
      exchange: "NSE",
      product: "MIS",
      qty: "0 / 15",
      price: 1495.0,
      status: "OPEN",
    },
    {
      id: "ord-104",
      time: "09:30:11",
      type: "BUY",
      instrument: "HDFCBANK",
      exchange: "NSE",
      product: "CNC",
      qty: "0 / 20",
      price: 1720.0,
      status: "CANCELLED",
    },
  ];

  const orders = propOrders && propOrders.length > 0 ? propOrders : defaultOrders;

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.type.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "executed") return ord.status === "COMPLETE";
    if (activeTab === "open") return ord.status === "OPEN";
    if (activeTab === "gtt") return ord.status === "GTT";
    return true;
  });

  return (
    <div className="orders-page-container">
      <div className="orders-header">
        <div className="orders-title-group">
          <h2>Orders ({orders.length})</h2>
          <div className="orders-tabs">
            <button
              className={`order-tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`order-tab-btn ${activeTab === "executed" ? "active" : ""}`}
              onClick={() => setActiveTab("executed")}
            >
              Executed
            </button>
            <button
              className={`order-tab-btn ${activeTab === "open" ? "active" : ""}`}
              onClick={() => setActiveTab("open")}
            >
              Open
            </button>
            <button
              className={`order-tab-btn ${activeTab === "gtt" ? "active" : ""}`}
              onClick={() => setActiveTab("gtt")}
            >
              GTT
            </button>
          </div>
        </div>

        <div className="orders-top-actions">
          <div className="orders-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Filter orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="btn-primary"
            onClick={() =>
              onOpenBuySell &&
              onOpenBuySell(
                { symbol: "RELIANCE", name: "Reliance Industries", price: 2890.5, exchange: "NSE" },
                "BUY"
              )
            }
          >
            + Place Order
          </button>
        </div>
      </div>

      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Instrument</th>
              <th>Product</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Status</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td className="time-col">{ord.time}</td>
                  <td>
                    <span className={`order-badge ${ord.type.toLowerCase()}`}>
                      {ord.type}
                    </span>
                  </td>
                  <td className="instrument-col">
                    <strong>{ord.instrument}</strong>
                    <span className="exchange-sub">{ord.exchange}</span>
                  </td>
                  <td>
                    <span className="product-badge">{ord.product}</span>
                  </td>
                  <td>{ord.qty}</td>
                  <td className="price-col">₹{ord.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${ord.status.toLowerCase()}`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="ord-id-col">{ord.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-orders-msg">
                  No orders found matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
