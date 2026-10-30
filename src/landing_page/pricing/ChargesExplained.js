import React from 'react';

function ChargesExplained() {
    const headingStyle = {
        fontSize: '1.15rem',
        fontWeight: 500,
        marginBottom: '10px',
    };

    const textStyle = {
        fontSize: '0.86rem',
        lineHeight: '1.65',
        marginBottom: '10px',
    };

    const listStyle = {
        fontSize: '0.86rem',
        lineHeight: '1.65',
        paddingLeft: '20px',
        marginBottom: '0',
    };

    return (
        <div className="container py-4 my-2 text-muted" style={{ maxWidth: "1150px" }}>
            {/* Main Section Heading - only this heading remains dark */}
            <h2 className="fs-2 fw-medium text-dark mb-4">Charges explained</h2>

            <div className="row gx-lg-5 gy-2 text-muted">
                {/* Left Column */}
                <div className="col-12 col-md-6 pe-lg-4 text-muted">
                    {/* STT/CTT */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Securities/Commodities transaction tax</h4>
                        <p className="text-muted" style={textStyle}>
                            Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&amp;O.
                        </p>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.
                        </p>
                    </div>

                    {/* Transaction/Turnover Charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Transaction/Turnover Charges</h4>
                        <p className="text-muted" style={textStyle}>
                            Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
                        </p>
                        <p className="text-muted" style={textStyle}>
                            BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)
                        </p>
                        <p className="text-muted" style={textStyle}>
                            BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.
                        </p>
                        <p className="text-muted" style={textStyle}>
                            BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.
                        </p>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.
                        </p>
                    </div>

                    {/* Call & trade */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Call &amp; trade</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.
                        </p>
                    </div>

                    {/* Stamp charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Stamp charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.
                        </p>
                    </div>

                    {/* NRI brokerage charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>NRI brokerage charges</h4>
                        <ul className="text-muted" style={listStyle}>
                            <li className="mb-1">For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&amp;O (whichever is lower).</li>
                            <li className="mb-1">For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                            <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
                        </ul>
                    </div>

                    {/* Account with debit balance */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Account with debit balance</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Accounts with a debit balance will be charged an additional ₹20 per executed order.
                        </p>
                    </div>

                    {/* Charges for IPFT by NSE */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Charges for Investor&apos;s Protection Fund Trust (IPFT) by NSE</h4>
                        <ul className="text-muted" style={listStyle}>
                            <li className="mb-1">Equity and Futures - ₹0.01 per crore + GST of the traded value.</li>
                            <li className="mb-1">Options - ₹0.01 per crore + GST traded value (premium value).</li>
                            <li>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
                        </ul>
                    </div>

                    {/* Margin Trading Facility (MTF) */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Margin Trading Facility (MTF)</h4>
                        <ul className="text-muted" style={listStyle}>
                            <li className="mb-1">MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.</li>
                            <li className="mb-1">MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.</li>
                            <li>MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-12 col-md-6 ps-lg-4 text-muted">
                    {/* GST */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>GST</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)
                        </p>
                    </div>

                    {/* SEBI Charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>SEBI Charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.
                        </p>
                    </div>

                    {/* DP charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>DP (Depository participant) charges</h4>
                        <p className="text-muted" style={textStyle}>
                            ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.
                        </p>
                        <p className="text-muted" style={textStyle}>
                            Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.
                        </p>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Debit transactions of mutual funds &amp; bonds get an additional discount of ₹0.25 on the CDSL fee.
                        </p>
                    </div>

                    {/* Pledging charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Pledging charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            ₹30 + GST per pledge request per ISIN.
                        </p>
                    </div>

                    {/* AMC (Account maintenance charges) */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>AMC (Account maintenance charges)</h4>
                        <p className="text-muted" style={textStyle}>
                            Free for the first year on all new resident individual accounts.
                        </p>
                        <p className="text-muted" style={textStyle}>
                            For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA,{" "}
                            <a 
                                href="https://support.zerodha.com/category/account-opening/offline-account-opening/bsda/articles/how-to-open-a-basic-service-demat-account-at-zerodha" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-decoration-none" 
                                style={{ color: "#387ed1" }}
                            >
                                Click here
                            </a>
                        </p>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC,{" "}
                            <a 
                                href="https://support.zerodha.com/category/account-opening/charges-at-zerodha/statutory-and-exchange/articles/what-is-the-annual-maintenance-charge" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-decoration-none" 
                                style={{ color: "#387ed1" }}
                            >
                                Click here
                            </a>
                        </p>
                    </div>

                    {/* Corporate action order charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Corporate action order charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            ₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.
                        </p>
                    </div>

                    {/* Off-market transfer charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Off-market transfer charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            ₹25 per transaction.
                        </p>
                    </div>

                    {/* Physical CMR request */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Physical CMR request</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.
                        </p>
                    </div>

                    {/* Payment gateway charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Payment gateway charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            ₹9 + GST (Not levied on transfers done via UPI)
                        </p>
                    </div>

                    {/* Delayed Payment Charges */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Delayed Payment Charges</h4>
                        <p className="text-muted" style={{ ...textStyle, marginBottom: 0 }}>
                            Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account.{" "}
                            <a 
                                href="https://support.zerodha.com/category/console/ledger/articles/interest-charges" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-decoration-none" 
                                style={{ color: "#387ed1" }}
                            >
                                Learn more
                            </a>.
                        </p>
                    </div>

                    {/* Trading using 3-in-1 account with block functionality */}
                    <div className="mb-4">
                        <h4 className="text-muted" style={headingStyle}>Trading using 3-in-1 account with block functionality</h4>
                        <ul className="text-muted" style={listStyle}>
                            <li className="mb-1">Delivery &amp; MTF Brokerage: 0.5% per executed order.</li>
                            <li>Intraday Brokerage: 0.05% per executed order.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="border-top pt-4 mt-3 text-muted">
                <h5 className="fw-medium text-muted mb-3" style={{ fontSize: "1.05rem" }}>Disclaimer</h5>
                <p className="text-muted" style={{ fontSize: "0.82rem", lineHeight: "1.75" }}>
                    For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.
                </p>
            </div>
        </div>
    );
}

export default ChargesExplained;
