import React, { useState } from 'react';

function Brokerage() {
    const [activeTab, setActiveTab] = useState('equity');

    const tabs = [
        { id: 'equity', label: 'Equity' },
        { id: 'currency', label: 'Currency' },
        { id: 'commodity', label: 'Commodity' },
        { id: 'us-equity', label: 'US Equity' },
    ];

    const styles = {
        tabBtn: (isActive) => ({
            background: 'none',
            border: 'none',
            borderBottom: isActive ? '3px solid #387ed1' : '3px solid transparent',
            color: isActive ? '#387ed1' : '#666',
            fontSize: '1.45rem',
            fontWeight: 500,
            padding: '10px 24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        }),
        tableHead: {
            backgroundColor: '#fff',
            color: '#424242',
            fontSize: '0.95rem',
            fontWeight: 500,
            borderBottom: '1px solid #eee',
        },
        tableRowHeader: {
            color: '#666',
            fontWeight: 400,
            fontSize: '0.95rem',
            width: '18%',
            padding: '18px 20px',
            verticalAlign: 'middle',
        },
        tableCell: {
            color: '#424242',
            fontSize: '0.92rem',
            lineHeight: 1.6,
            padding: '18px 20px',
            verticalAlign: 'middle',
            borderTop: '1px solid #f0f0f0',
        },
        freeBadge: {
            backgroundColor: '#4caf50',
            color: '#fff',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '3px',
            display: 'inline-block',
            letterSpacing: '0.5px',
        },
        amcPill: {
            backgroundColor: '#f1f8ff',
            borderLeft: '4px solid #387ed1',
            padding: '14px 22px',
            color: '#387ed1',
            fontSize: '1rem',
            fontWeight: 500,
            borderRadius: '0 4px 4px 0',
            maxWidth: '240px',
        },
    };

    return (
        <div className="container py-4 my-3" style={{ maxWidth: "1150px" }}>
            {/* 1. Tabs Navigation */}
            <div className="d-flex border-bottom mb-4 gap-2 flex-wrap" style={{ borderColor: "#eee" }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        style={styles.tabBtn(activeTab === tab.id)}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 2. Trading Charges Table Container */}
            <div className="table-responsive border rounded shadow-sm bg-white mb-5" style={{ borderColor: "#eee" }}>
                {activeTab === 'equity' && (
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ ...styles.tableRowHeader, borderTop: "none" }}></th>
                                <th style={{ padding: "18px 20px", borderTop: "none" }}>Equity delivery</th>
                                <th style={{ padding: "18px 20px", borderTop: "none" }}>Equity intraday</th>
                                <th style={{ padding: "18px 20px", borderTop: "none" }}>F&amp;O - Futures</th>
                                <th style={{ padding: "18px 20px", borderTop: "none" }}>F&amp;O - Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.tableRowHeader}>Brokerage</td>
                                <td style={styles.tableCell}>Zero Brokerage</td>
                                <td style={styles.tableCell}>0.03% or Rs. 20/executed order whichever is lower</td>
                                <td style={styles.tableCell}>0.03% or Rs. 20/executed order whichever is lower</td>
                                <td style={styles.tableCell}>Flat Rs. 20 per executed order</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>STT/CTT</td>
                                <td style={styles.tableCell}>0.1% on buy &amp; sell</td>
                                <td style={styles.tableCell}>0.025% on the sell side</td>
                                <td style={styles.tableCell}>0.05% on the sell side</td>
                                <td style={styles.tableCell}>
                                    <ul className="mb-0 ps-3" style={{ listStyleType: "disc" }}>
                                        <li className="mb-2">0.15% of the intrinsic value on options that are bought and exercised</li>
                                        <li>0.15% on sell side (on premium)</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Transaction charges</td>
                                <td style={styles.tableCell}>
                                    NSE: 0.00307%<br />
                                    BSE: 0.00375%
                                </td>
                                <td style={styles.tableCell}>
                                    NSE: 0.00307%<br />
                                    BSE: 0.00375%
                                </td>
                                <td style={styles.tableCell}>
                                    NSE: 0.00183%<br />
                                    BSE: 0
                                </td>
                                <td style={styles.tableCell}>
                                    NSE: 0.03553% (on premium)<br />
                                    BSE: 0.0325% (on premium)
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>GST</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>SEBI charges</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Stamp charges</td>
                                <td style={styles.tableCell}>0.015% or ₹1500 / crore on buy side</td>
                                <td style={styles.tableCell}>0.003% or ₹300 / crore on buy side</td>
                                <td style={styles.tableCell}>0.002% or ₹200 / crore on buy side</td>
                                <td style={styles.tableCell}>0.003% or ₹300 / crore on buy side</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {activeTab === 'currency' && (
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ ...styles.tableRowHeader, borderTop: "none" }}></th>
                                <th style={{ padding: "18px 20px", borderTop: "none", width: "41%" }}>Currency futures</th>
                                <th style={{ padding: "18px 20px", borderTop: "none", width: "41%" }}>Currency options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.tableRowHeader}>Brokerage</td>
                                <td style={styles.tableCell}>0.03% or ₹ 20/executed order whichever is lower</td>
                                <td style={styles.tableCell}>₹ 20/executed order</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>STT/CTT</td>
                                <td style={styles.tableCell}>No STT</td>
                                <td style={styles.tableCell}>No STT</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Transaction charges</td>
                                <td style={styles.tableCell}>
                                    NSE: 0.00035%<br />
                                    BSE: 0.00045%
                                </td>
                                <td style={styles.tableCell}>
                                    NSE: 0.0311%<br />
                                    BSE: 0.001%
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>GST</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>SEBI charges</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Stamp charges</td>
                                <td style={styles.tableCell}>0.0001% or ₹10 / crore on buy side</td>
                                <td style={styles.tableCell}>0.0001% or ₹10 / crore on buy side</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {activeTab === 'commodity' && (
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ ...styles.tableRowHeader, borderTop: "none" }}></th>
                                <th style={{ padding: "18px 20px", borderTop: "none", width: "41%" }}>Commodity futures</th>
                                <th style={{ padding: "18px 20px", borderTop: "none", width: "41%" }}>Commodity options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.tableRowHeader}>Brokerage</td>
                                <td style={styles.tableCell}>0.03% or Rs. 20/executed order whichever is lower</td>
                                <td style={styles.tableCell}>₹ 20/executed order</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>STT/CTT</td>
                                <td style={styles.tableCell}>0.01% on sell side (Non-Agri)</td>
                                <td style={styles.tableCell}>0.05% on sell side</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Transaction charges</td>
                                <td style={styles.tableCell}>
                                    MCX: 0.0021%<br />
                                    NSE: 0.0001%
                                </td>
                                <td style={styles.tableCell}>
                                    MCX: 0.0418%<br />
                                    NSE: 0.001%
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>GST</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                                <td style={styles.tableCell}>18% on (brokerage + SEBI charges + transaction charges)</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>SEBI charges</td>
                                <td style={styles.tableCell}>
                                    Agri:<br />
                                    ₹1 / crore<br /><br />
                                    Non-agri:<br />
                                    ₹10 / crore
                                </td>
                                <td style={styles.tableCell}>₹10 / crore</td>
                            </tr>
                            <tr>
                                <td style={styles.tableRowHeader}>Stamp charges</td>
                                <td style={styles.tableCell}>0.002% or ₹200 / crore on buy side</td>
                                <td style={styles.tableCell}>0.003% or ₹300 / crore on buy side</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {activeTab === 'us-equity' && (
                    <div>
                        <table className="table mb-0 align-middle">
                            <tbody>
                                <tr>
                                    <td style={{ ...styles.tableRowHeader, width: "22%" }}>Brokerage</td>
                                    <td style={styles.tableCell}>0.10% (Min $0.01, Max $10 on Buy/Sell)</td>
                                </tr>
                                <tr>
                                    <td style={styles.tableRowHeader}>Transaction charges</td>
                                    <td style={styles.tableCell}>
                                        SEC Fees: 0.00206% on sell trade value<br />
                                        FINRA fee: $0.000195 per share (max $9.79) on sell quantity*<br />
                                        IFSCA Turnover Fee: 0.005% on trade value (Buy &amp; Sell)
                                    </td>
                                </tr>
                                <tr>
                                    <td style={styles.tableRowHeader}>GST</td>
                                    <td style={styles.tableCell}>18% on brokerage amount</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="p-3 text-muted" style={{ fontSize: "0.82rem" }}>
                            *The FINRA Trading Activity Fee (TAF) is paused from 1st October to 31st December 2026.
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Brokerage Calculator Callout Link */}
            <div className="text-center my-5 py-2">
                <h5 className="fw-normal" style={{ fontSize: "1.3rem", color: "#424242" }}>
                    <a
                        href="https://zerodha.com/brokerage-calculator"
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fw-medium"
                        style={{ color: "#387ed1" }}
                    >
                        Calculate your costs upfront
                    </a>{" "}
                    using our brokerage calculator
                </h5>
            </div>

            {/* 4. Charges for account opening */}
            <div className="mt-5 pt-4">
                <h3 className="fs-3 fw-medium text-dark mb-4">Charges for account opening</h3>

                <div className="table-responsive border rounded shadow-sm bg-white mb-5" style={{ borderColor: "#eee" }}>
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "70%" }}>Type of account</th>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "30%" }}>Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Individual account</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    <span style={styles.freeBadge}>FREE</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Minor account</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    <span style={styles.freeBadge}>FREE</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>NRI account</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>₹ 500</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>HUF account</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    <span style={styles.freeBadge}>FREE</span> (online) / ₹ 500 (offline)
                                </td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Partnership, LLP, and Corporate accounts (offline only)</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>₹ 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. Demat AMC (Annual Maintenance Charge) */}
            <div className="mt-5 pt-2 mb-5">
                <h3 className="fs-3 fw-medium text-dark mb-4">Demat AMC (Annual Maintenance Charge)</h3>

                <div className="mb-4">
                    <div style={styles.amcPill}>
                        Free for first year*
                    </div>
                </div>

                <p className="text-muted mb-3" style={{ fontSize: "0.92rem", lineHeight: 1.6 }}>
                    From second year onwards, for BSDA accounts:
                </p>

                {/* AMC Table */}
                <div className="table-responsive border rounded shadow-sm bg-white mb-4" style={{ borderColor: "#eee" }}>
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "50%" }}>Value of holdings</th>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "50%" }}>AMC</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Up to ₹4 lakh</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    <span style={styles.freeBadge}>FREE</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>₹4 lakh &ndash; ₹10 lakh</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    ₹100 per year + 18% GST, charged quarterly
                                </td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Above ₹10 lakh</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>
                                    ₹300 per year + 18% GST, charged quarterly
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* AMC Footnotes */}
                <div className="text-muted mb-5" style={{ fontSize: "0.88rem", lineHeight: "1.8" }}>
                    <p className="mb-2">
                        For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless of holdings value, charged quarterly.
                    </p>
                    <p className="mb-2">
                        To learn more about BSDA,{" "}
                        <a
                            href="https://support.zerodha.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                            style={{ color: "#387ed1" }}
                        >
                            click here
                        </a>
                        . To learn more about AMC,{" "}
                        <a
                            href="https://support.zerodha.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-decoration-none"
                            style={{ color: "#387ed1" }}
                        >
                            click here
                        </a>
                        .
                    </p>
                    <p className="mb-0">
                        *Resident individual accounts only.
                    </p>
                </div>
            </div>

            {/* 6. Charges for optional value added services */}
            <div className="mt-5 pt-3 mb-5">
                <h3 className="fs-3 fw-medium text-dark mb-4">Charges for optional value added services</h3>

                <div className="table-responsive border rounded shadow-sm bg-white mb-4" style={{ borderColor: "#eee" }}>
                    <table className="table mb-0 align-middle">
                        <thead>
                            <tr style={styles.tableHead}>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "25%" }}>Service</th>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "35%" }}>Billing Frequency</th>
                                <th style={{ padding: "18px 24px", borderTop: "none", width: "40%" }}>Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Tickertape</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Monthly / Quarterly / Annual</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Free: 0 | Pro: 249/699/2399</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Smallcase</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Per transaction</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Buy &amp; Invest More: 100 | SIP: 10</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Kite Connect</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Monthly</td>
                                <td style={{ ...styles.tableCell, padding: "18px 24px" }}>Connect: 500 | Personal: Free</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Brokerage;
