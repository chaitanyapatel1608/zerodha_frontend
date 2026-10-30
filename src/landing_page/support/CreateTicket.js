import React, { useState } from 'react';

function CreateTicket() {
    // Open the first category ("accountOpening") by default
    const [activeCategory, setActiveCategory] = useState('accountOpening');

    const toggleCategory = (key) => {
        setActiveCategory(prev => prev === key ? null : key);
    };

    const categories = [
        {
            key: 'accountOpening',
            title: 'Account Opening',
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#387ed1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            ),
            links: [
                'Resident individual',
                'Minor',
                'Non Resident Indian (NRI)',
                'Company, Partnership, HUF and LLP',
                'Glossary',
            ],
        },
        {
            key: 'yourAccount',
            title: 'Your Zerodha Account',
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#387ed1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="8.5" r="3"></circle>
                    <path d="M6.5 17.5a6 6 0 0 1 11 0"></path>
                </svg>
            ),
            links: [
                'Your Profile',
                'Account modification',
                'Client Master Report (CMR) and Depository Participant (DP)',
                'Nomination',
                'Transfer and conversion of securities',
            ],
        },
        {
            key: 'kite',
            title: 'Kite',
            icon: (
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "1.8px solid #387ed1",
                        color: "#387ed1",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                    }}
                >
                    @
                </span>
            ),
            links: [
                'IPO',
                'Trading FAQs',
                'Margin Trading Facility (MTF) and Margins',
                'Charts and orders',
                'Alerts and Nudges',
                'General',
            ],
        },
        {
            key: 'funds',
            title: 'Funds',
            icon: (
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "1.8px solid #387ed1",
                        color: "#387ed1",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                    }}
                >
                    ₹
                </span>
            ),
            links: [
                'Add money',
                'Withdraw money',
                'Add bank accounts',
                'eMandates',
            ],
        },
        {
            key: 'console',
            title: 'Console',
            icon: (
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        border: "1.8px solid #387ed1",
                        color: "#387ed1",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                    }}
                >
                    @
                </span>
            ),
            links: [
                'Portfolio',
                'Corporate actions',
                'Funds statement',
                'Reports',
                'Profile',
                'Segments',
            ],
        },
        {
            key: 'coin',
            title: 'Coin',
            icon: (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#387ed1"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 10"></polyline>
                </svg>
            ),
            links: [
                'Mutual funds',
                'National Pension Scheme (NPS)',
                'Fixed Deposit (FD)',
                'Features on Coin',
                'Payments and Orders',
                'General',
            ],
        },
    ];

    const quickLinks = [
        { text: '1. Track account opening', href: '#track-account' },
        { text: '2. Track segment activation', href: '#track-segment' },
        { text: '3. Intraday margins', href: '#intraday-margins' },
        { text: '4. Kite user manual', href: '#kite-manual' },
        { text: '5. Learn how to create a ticket', href: '#create-ticket' },
    ];

    return (
        <div className="container pb-5 mb-5" style={{ maxWidth: "1200px" }}>
            <div className="row gx-lg-5 gy-4">
                {/* Left Column: Interactive Categories Accordion */}
                <div className="col-12 col-lg-8">
                    {categories.map((cat) => {
                        const isOpen = activeCategory === cat.key;
                        return (
                            <div
                                key={cat.key}
                                className="mb-3"
                                style={{
                                    border: "1px solid #e8e8e8",
                                    borderRadius: "3px",
                                    backgroundColor: "#fff",
                                    overflow: "hidden",
                                    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
                                }}
                            >
                                {/* Category Header Box */}
                                <div
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={() => toggleCategory(cat.key)}
                                    style={{
                                        cursor: "pointer",
                                        height: "56px",
                                        backgroundColor: "#fff",
                                        border: isOpen ? "1.5px solid #222" : "1.5px solid transparent",
                                        transition: "border-color 0.3s ease",
                                    }}
                                >
                                    <div className="d-flex align-items-center h-100">
                                        <div
                                            className="d-flex align-items-center justify-content-center h-100"
                                            style={{
                                                width: "56px",
                                                backgroundColor: "#f4f8fc",
                                                borderRight: "1px solid #edf2f7",
                                            }}
                                        >
                                            {cat.icon}
                                        </div>
                                        <span
                                            className="ps-3"
                                            style={{
                                                fontSize: "1.05rem",
                                                fontWeight: 400,
                                                color: "#424242",
                                            }}
                                        >
                                            {cat.title}
                                        </span>
                                    </div>
                                    <div className="pe-4 d-flex align-items-center">
                                        {/* Pure SVG Arrow: Points UP when open, DOWN when closed */}
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#387ed1"
                                            strokeWidth="2.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                transition: "transform 0.35s ease",
                                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                        >
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                </div>

                                {/* Animated Sub-links List rendered inside the rectangle container */}
                                <div
                                    style={{
                                        maxHeight: isOpen ? "380px" : "0px",
                                        opacity: isOpen ? 1 : 0,
                                        overflow: "hidden",
                                        transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, padding 0.35s ease",
                                        paddingTop: isOpen ? "16px" : "0px",
                                        paddingBottom: isOpen ? "24px" : "0px",
                                        paddingLeft: "28px",
                                        paddingRight: "20px",
                                    }}
                                >
                                    <ul
                                        className="mb-0 ps-4"
                                        style={{
                                            listStyleType: "disc",
                                            lineHeight: "2.4",
                                            color: "#387ed1",
                                        }}
                                    >
                                        {cat.links.map((link, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={`#${link.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                                    style={{
                                                        color: "#387ed1",
                                                        fontSize: "0.95rem",
                                                        textDecoration: "none",
                                                    }}
                                                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                                                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Column: Sidebar Widgets */}
                <div className="col-12 col-lg-4">
                    {/* Orange Notices Box */}
                    <div
                        className="p-4 mb-4"
                        style={{
                            backgroundColor: "#fff9f2",
                            borderLeft: "4px solid #ff7043",
                            borderRadius: "2px",
                        }}
                    >
                        <ul className="mb-0 ps-3" style={{ lineHeight: "2.1", listStyleType: "disc", color: "#387ed1" }}>
                            <li className="mb-2">
                                <a
                                    href="#takeovers"
                                    style={{
                                        color: "#387ed1",
                                        fontSize: "0.93rem",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Current Takeovers and Delisting – November 2026
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#surveillance"
                                    style={{
                                        color: "#387ed1",
                                        fontSize: "0.93rem",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Surveillance measure on scrips - October 2026
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Card with Top Header Bar & Separated List Rows */}
                    <div
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #e8e8e8",
                            borderRadius: "3px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Gray Header */}
                        <div
                            style={{
                                backgroundColor: "#f6f8fa",
                                padding: "13px 20px",
                                borderBottom: "1px solid #e8e8e8",
                                fontSize: "0.98rem",
                                fontWeight: 500,
                                color: "#424242",
                            }}
                        >
                            Quick links
                        </div>

                        {/* Divided Row Items */}
                        <div>
                            {quickLinks.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: "12px 20px",
                                        borderBottom: idx !== quickLinks.length - 1 ? "1px solid #eee" : "none",
                                    }}
                                >
                                    <a
                                        href={item.href}
                                        style={{
                                            color: "#387ed1",
                                            fontSize: "0.92rem",
                                            textDecoration: "none",
                                            display: "block",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                                        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                                    >
                                        {item.text}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
