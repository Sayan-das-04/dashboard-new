import React, { useState } from "react";
import "./Funds.css";

function Funds({ fundsData, onUpdateFunds, onShowToast }) {
  const [activeSegment, setActiveSegment] = useState("equity");
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(10000);
  const [paymentMode, setPaymentMode] = useState("UPI");

  const [transactions, setTransactions] = useState([
    { id: "TXN-8821", date: "Today, 10:15 AM", type: "Deposit", mode: "UPI (Google Pay)", amount: 15000, status: "SUCCESS" },
    { id: "TXN-7412", date: "Yesterday, 04:30 PM", type: "Withdrawal", mode: "Bank Transfer", amount: 5000, status: "SUCCESS" },
    { id: "TXN-6109", date: "22 Sep, 11:20 AM", type: "Deposit", mode: "Net Banking (HDFC)", amount: 25000, status: "SUCCESS" },
  ]);

  const equityAvailable = fundsData?.equityAvailable ?? 142850.25;
  const equityUsed = fundsData?.equityUsed ?? 24180.0;
  const commodityAvailable = fundsData?.commodityAvailable ?? 45200.0;
  const commodityUsed = fundsData?.commodityUsed ?? 0.0;

  const currentAvailable = activeSegment === "equity" ? equityAvailable : commodityAvailable;
  const currentUsed = activeSegment === "equity" ? equityUsed : commodityUsed;
  const currentOpening = currentAvailable + currentUsed;

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(depositAmount);
    if (!amountNum || amountNum <= 0) return;

    if (onUpdateFunds) {
      onUpdateFunds(amountNum);
    }

    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Just now",
      type: "Deposit",
      mode: `${paymentMode}`,
      amount: amountNum,
      status: "SUCCESS",
    };
    setTransactions([newTxn, ...transactions]);
    setShowAddFundsModal(false);

    if (onShowToast) {
      onShowToast(`₹${amountNum.toLocaleString("en-IN")} deposited successfully via ${paymentMode}!`, "success");
    }
  };

  return (
    <div className="funds-page-container">
      {/* Top Banner with Add & Withdraw CTA */}
      <div className="funds-hero-card">
        <div className="hero-left">
          <span className="hero-label">Available Margin ({activeSegment.toUpperCase()})</span>
          <h1 className="hero-margin-amount">
            ₹{currentAvailable.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="segment-switcher">
            <button
              className={`segment-btn ${activeSegment === "equity" ? "active" : ""}`}
              onClick={() => setActiveSegment("equity")}
            >
              Equity
            </button>
            <button
              className={`segment-btn ${activeSegment === "commodity" ? "active" : ""}`}
              onClick={() => setActiveSegment("commodity")}
            >
              Commodity
            </button>
          </div>
        </div>

        <div className="hero-right-actions">
          <button
            className="btn-add-funds"
            onClick={() => setShowAddFundsModal(true)}
          >
            + Add Funds
          </button>
          <button
            className="btn-withdraw-funds"
            onClick={() => {
              if (onShowToast) onShowToast("Withdrawal request created for processing.", "info");
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Margin Breakdown Grid */}
      <div className="margin-breakdown-grid">
        <div className="breakdown-card">
          <span className="card-title">Available Cash</span>
          <strong className="card-value">₹{currentAvailable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          <span className="card-sub">Liquid balance for trading</span>
        </div>

        <div className="breakdown-card">
          <span className="card-title">Opening Balance</span>
          <strong className="card-value">₹{currentOpening.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          <span className="card-sub">Start of day balance</span>
        </div>

        <div className="breakdown-card">
          <span className="card-title">Used Margin</span>
          <strong className="card-value text-orange">₹{currentUsed.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong>
          <span className="card-sub">Allocated to open positions</span>
        </div>

        <div className="breakdown-card">
          <span className="card-title">Collateral Margin</span>
          <strong className="card-value text-blue">₹50,000.00</strong>
          <span className="card-sub">Against pledged holdings</span>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="funds-history-section">
        <div className="history-header">
          <h3>Recent Fund Transfers</h3>
          <span className="history-count">{transactions.length} transfers</span>
        </div>

        <table className="funds-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Reference ID</th>
              <th>Type</th>
              <th>Mode</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="date-col">{tx.date}</td>
                <td className="ref-col">{tx.id}</td>
                <td>
                  <span className={`type-tag ${tx.type.toLowerCase()}`}>
                    {tx.type}
                  </span>
                </td>
                <td>{tx.mode}</td>
                <td className="amount-col">
                  {tx.type === "Deposit" ? "+₹" : "-₹"}
                  {tx.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span className="status-badge-success">{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="add-funds-modal-backdrop">
          <div className="add-funds-modal">
            <div className="modal-header">
              <h3>Instant Fund Deposit</h3>
              <button
                className="modal-close"
                onClick={() => setShowAddFundsModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDepositSubmit} className="modal-body">
              <div className="form-group">
                <label>Deposit Amount (₹)</label>
                <div className="amount-input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="quick-amount-buttons">
                {[5000, 10000, 25000, 50000].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    className="quick-amt-pill"
                    onClick={() => setDepositAmount(amt)}
                  >
                    +₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <label className={`payment-radio ${paymentMode === "UPI" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="mode"
                      value="UPI"
                      checked={paymentMode === "UPI"}
                      onChange={() => setPaymentMode("UPI")}
                    />
                    <span>UPI (Google Pay, PhonePe, BHIM) • Instant (₹0 fee)</span>
                  </label>
                  <label className={`payment-radio ${paymentMode === "NetBanking" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="mode"
                      value="NetBanking"
                      checked={paymentMode === "NetBanking"}
                      onChange={() => setPaymentMode("NetBanking")}
                    />
                    <span>Net Banking (HDFC, ICICI, SBI) • Instant</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddFundsModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-confirm-deposit">
                  Proceed to Pay ₹{parseFloat(depositAmount || 0).toLocaleString("en-IN")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Funds;

