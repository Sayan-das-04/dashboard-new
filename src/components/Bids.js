import React, { useState } from "react";
import "./Bids.css";

function Bids({ onShowToast }) {
  const [activeTab, setActiveTab] = useState("ipo");
  const [selectedIpo, setSelectedIpo] = useState(null);
  const [upiId, setUpiId] = useState("sayan@okaxis");
  const [lots, setLots] = useState(1);

  const ipoList = [
    {
      id: "ipo-1",
      name: "Swiggy Limited",
      dates: "06 Nov - 08 Nov 2026",
      priceBand: "₹371 - ₹390",
      lotSize: 38,
      minAmount: 14820,
      issueSize: "₹11,327 Cr",
      subscription: "14.2x",
      status: "OPEN",
    },
    {
      id: "ipo-2",
      name: "Hyundai Motor India Ltd",
      dates: "15 Nov - 17 Nov 2026",
      priceBand: "₹1,865 - ₹1,960",
      lotSize: 7,
      minAmount: 13720,
      issueSize: "₹27,870 Cr",
      subscription: "2.4x",
      status: "UPCOMING",
    },
    {
      id: "ipo-3",
      name: "Bajaj Housing Finance Ltd",
      dates: "Closed (Listing Soon)",
      priceBand: "₹66 - ₹70",
      lotSize: 214,
      minAmount: 14980,
      issueSize: "₹6,560 Cr",
      subscription: "63.6x",
      status: "CLOSED",
    },
    {
      id: "ipo-4",
      name: "NTPC Green Energy Ltd",
      dates: "20 Nov - 22 Nov 2026",
      priceBand: "₹102 - ₹108",
      lotSize: 138,
      minAmount: 14904,
      issueSize: "₹10,000 Cr",
      subscription: "--",
      status: "UPCOMING",
    },
  ];

  const gSecList = [
    {
      id: "gsec-1",
      name: "7.10% GS 2034 (10Y Benchmark)",
      yield: "7.08%",
      minInv: "₹10,000",
      tenor: "10 Years",
    },
    {
      id: "gsec-2",
      name: "364 Day Treasury Bill",
      yield: "6.92%",
      minInv: "₹10,000",
      tenor: "364 Days",
    },
    {
      id: "gsec-3",
      name: "91 Day Treasury Bill",
      yield: "6.75%",
      minInv: "₹10,000",
      tenor: "91 Days",
    },
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedIpo) return;
    const totalAmount = selectedIpo.minAmount * lots;

    if (onShowToast) {
      onShowToast(
        `IPO Bid of ₹${totalAmount.toLocaleString("en-IN")} submitted for ${selectedIpo.name}! Mandate sent to ${upiId}.`,
        "success",
      );
    }
    setSelectedIpo(null);
  };

  return (
    <div className="bids-page-container">
      <div className="bids-header">
        <div className="bids-title-group">
          <h2>Bids & Primary Markets</h2>
          <div className="bids-tabs">
            <button
              className={`bid-tab-btn ${activeTab === "ipo" ? "active" : ""}`}
              onClick={() => setActiveTab("ipo")}
            >
              IPOs ({ipoList.filter((i) => i.status === "OPEN").length} Open)
            </button>
            <button
              className={`bid-tab-btn ${activeTab === "gsec" ? "active" : ""}`}
              onClick={() => setActiveTab("gsec")}
            >
              Govt Securities (G-Sec)
            </button>
            <button
              className={`bid-tab-btn ${activeTab === "sgb" ? "active" : ""}`}
              onClick={() => setActiveTab("sgb")}
            >
              Gold Bonds (SGB)
            </button>
          </div>
        </div>
      </div>

      {activeTab === "ipo" && (
        <div className="ipo-table-wrap">
          <table className="bids-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Dates</th>
                <th>Price Band</th>
                <th>Min. Qty (Lot)</th>
                <th>Issue Size</th>
                <th>Subscribed</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ipoList.map((ipo) => (
                <tr key={ipo.id}>
                  <td className="company-name-col">
                    <strong>{ipo.name}</strong>
                  </td>
                  <td>{ipo.dates}</td>
                  <td>{ipo.priceBand}</td>
                  <td>
                    {ipo.lotSize} Shares (₹
                    {ipo.minAmount.toLocaleString("en-IN")})
                  </td>
                  <td>{ipo.issueSize}</td>
                  <td>
                    <span className="sub-badge">{ipo.subscription}</span>
                  </td>
                  <td>
                    <span
                      className={`ipo-status-badge ${ipo.status.toLowerCase()}`}
                    >
                      {ipo.status}
                    </span>
                  </td>
                  <td>
                    {ipo.status === "OPEN" ? (
                      <button
                        className="btn-apply-ipo"
                        onClick={() => setSelectedIpo(ipo)}
                      >
                        Apply
                      </button>
                    ) : (
                      <button className="btn-apply-disabled" disabled>
                        {ipo.status === "CLOSED" ? "Closed" : "Pre-apply"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "gsec" && (
        <div className="gsec-grid">
          {gSecList.map((g) => (
            <div key={g.id} className="gsec-card">
              <span className="gsec-tag">RBI G-SEC</span>
              <h4>{g.name}</h4>
              <div className="gsec-metrics">
                <div>
                  <span>Indicative Yield</span>
                  <strong>{g.yield}</strong>
                </div>
                <div>
                  <span>Tenor</span>
                  <strong>{g.tenor}</strong>
                </div>
                <div>
                  <span>Min. Investment</span>
                  <strong>{g.minInv}</strong>
                </div>
              </div>
              <button
                className="btn-bid-gsec"
                onClick={() => {
                  if (onShowToast)
                    onShowToast(`Bid registered for ${g.name}.`, "info");
                }}
              >
                Place Bid →
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "sgb" && (
        <div className="sgb-card-banner">
          <div className="sgb-left">
            <span className="sgb-badge">
              Govt of India Sovereign Gold Bonds
            </span>
            <h3>SGB 2026-27 Series II</h3>
            <p>
              Earn 2.50% assured annual interest payable semi-annually +
              tax-free gold appreciation on maturity.
            </p>
            <div className="sgb-details">
              <span>
                Issue Price: <strong>₹6,210 / gram</strong> (₹50 online
                discount)
              </span>
            </div>
          </div>
          <button
            className="btn-apply-sgb"
            onClick={() => {
              if (onShowToast)
                onShowToast("SGB Order placed successfully!", "success");
            }}
          >
            Apply for Gold Bonds
          </button>
        </div>
      )}

      {/* Apply IPO Modal */}
      {selectedIpo && (
        <div className="ipo-modal-backdrop">
          <div className="ipo-modal">
            <div className="ipo-modal-header">
              <h3>Apply for {selectedIpo.name}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedIpo(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="ipo-modal-body">
              <div className="ipo-summary-box">
                <div>
                  <span>Price Band:</span>
                  <strong>{selectedIpo.priceBand}</strong>
                </div>
                <div>
                  <span>Lot Size:</span>
                  <strong>{selectedIpo.lotSize} shares / lot</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Number of Lots</label>
                <div className="lots-stepper">
                  <button
                    type="button"
                    onClick={() => setLots(Math.max(1, lots - 1))}
                  >
                    -
                  </button>
                  <span>
                    {lots} ({lots * selectedIpo.lotSize} shares)
                  </span>
                  <button type="button" onClick={() => setLots(lots + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>UPI ID (For ASBA Mandate)</label>
                <input
                  type="text"
                  className="upi-input"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi"
                  required
                />
              </div>

              <div className="ipo-mandate-info">
                <span>Total Amount Blocked:</span>
                <strong>
                  ₹{(selectedIpo.minAmount * lots).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="ipo-modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setSelectedIpo(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit-ipo">
                  Confirm Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bids;
