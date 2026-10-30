import React from "react";

function Footer() {
    return (
        <footer className="border-top" style={{ backgroundColor: "#fbfbfb" }}>
            <div className="container pt-5 pb-4">
                {/* Upper Footer: 5 Columns */}
                <div className="row g-4 mb-5">
                    {/* Column 1: Brand & Social */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <img 
                            src="/media/images/logo.svg" 
                            alt="Zerodha Logo" 
                            style={{ width: "140px" }} 
                            className="mb-3"
                        />
                        <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                            &copy; 2010 - 2026, Zerodha Broking Ltd.<br />
                            All rights reserved.
                        </p>

                        {/* Social Links Row 1 */}
                        <div className="d-flex gap-3 text-muted fs-5 mb-3 footer-social-icons">
                            <a href="https://twitter.com/zerodhaonline" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                            <a href="https://facebook.com/zerodha.social" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <i className="fa-brands fa-square-facebook"></i>
                            </a>
                            <a href="https://instagram.com/zerodhaonline" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://linkedin.com/company/zerodha" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>

                        {/* Social Links Row 2 */}
                        <div className="d-flex gap-3 text-muted fs-5 mb-4 footer-social-icons">
                            <a href="https://youtube.com/@zerodhaonline" target="_blank" rel="noreferrer" aria-label="YouTube">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                            <a href="https://whatsapp.com/channel/zerodha" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="https://t.me/zerodhainvestor" target="_blank" rel="noreferrer" aria-label="Telegram">
                                <i className="fa-brands fa-telegram"></i>
                            </a>
                        </div>

                        {/* App Store Badges */}
                        <div className="d-flex gap-2 flex-wrap">
                            <a href="https://play.google.com/store/apps/details?id=com.zerodha.kite3" target="_blank" rel="noreferrer">
                                <img src="/media/images/googlePlayBadge.svg" alt="Get it on Google Play" style={{ height: "34px" }} />
                            </a>
                            <a href="https://apps.apple.com/in/app/zerodha-kite-trade-invest/id1449453802" target="_blank" rel="noreferrer">
                                <img src="/media/images/appstoreBadge.svg" alt="Download on the App Store" style={{ height: "34px" }} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Account */}
                    <div className="col-6 col-md-4 col-lg-2 offset-lg-1 footer-links">
                        <p className="fw-medium text-dark mb-3" style={{ fontSize: "1.05rem" }}>Account</p>
                        <a href="/signup">Open demat account</a>
                        <a href="/minor-demat">Minor demat account</a>
                        <a href="/nri-demat">NRI demat account</a>
                        <a href="/huf-demat">HUF demat account</a>
                        <a href="/commodity">Commodity</a>
                        <a href="/dematerialisation">Dematerialisation</a>
                        <a href="/fund-transfer">Fund transfer</a>
                        <a href="/mtf">MTF</a>
                    </div>

                    {/* Column 3: Support */}
                    <div className="col-6 col-md-4 col-lg-2 footer-links">
                        <p className="fw-medium text-dark mb-3" style={{ fontSize: "1.05rem" }}>Support</p>
                        <a href="/contact">Contact us</a>
                        <a href="/support">Support portal</a>
                        <a href="/complaints">How to file a complaint?</a>
                        <a href="/complaint-status">Status of your complaints</a>
                        <a href="/bulletin">Bulletin</a>
                        <a href="/circular">Circular</a>
                        <a href="https://zerodha.com/z-connect/">Z-Connect blog</a>
                        <a href="/downloads">Downloads</a>
                    </div>

                    {/* Column 4: Company */}
                    <div className="col-6 col-md-6 col-lg-2 footer-links">
                        <p className="fw-medium text-dark mb-3" style={{ fontSize: "1.05rem" }}>Company</p>
                        <a href="/about">About</a>
                        <a href="/philosophy">Philosophy</a>
                        <a href="/press">Press &amp; media</a>
                        <a href="/careers">Careers</a>
                        <a href="/csr">Zerodha Cares (CSR)</a>
                        <a href="https://zerodha.tech">Zerodha.tech</a>
                        <a href="/open-source">Open source</a>
                        <a href="/referral">Referral program</a>
                    </div>

                    {/* Column 5: Quick links */}
                    <div className="col-6 col-md-6 col-lg-2 footer-links">
                        <p className="fw-medium text-dark mb-3" style={{ fontSize: "1.05rem" }}>Quick links</p>
                        <a href="/ipo">Upcoming IPOs</a>
                        <a href="/pricing">Brokerage charges</a>
                        <a href="/holidays">Market holidays</a>
                        <a href="/calendar">Economic calendar</a>
                        <a href="/calculators">Calculators</a>
                        <a href="/markets">Markets</a>
                        <a href="/sectors">Sectors</a>
                        <a href="/gift-nifty">Gift Nifty</a>
                    </div>
                </div>

                {/* Lower Footer: Regulatory Disclosures & Compliance */}
                <div className="footer-disclaimer text-muted border-top pt-4" style={{ fontSize: "0.74rem", lineHeight: "1.7" }}>
                    <p className="mb-3">
                        Zerodha Broking Limited: Member of NSE, BSE, MCX &amp; MSEI &ndash; SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Limited &ndash; SEBI Registration no.: IN-DP-431-2019, CIN: U65928KA2018PLC116815, Registered Address: #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@zerodha.com" className="text-decoration-none">complaints@zerodha.com</a>, for DP related to <a href="mailto:dp@zerodha.com" className="text-decoration-none">dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
                    </p>

                    <p className="mb-3">
                        Procedure to file a complaint on <a href="https://scores.gov.in" target="_blank" rel="noreferrer" className="text-decoration-none">SEBI SCORES</a>/<a href="https://smartodr.in" target="_blank" rel="noreferrer" className="text-decoration-none">SMARTODR</a>: Register on SCORES portal &amp; SMARTODR. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of grievances
                    </p>

                    <p className="mb-3">
                        <a href="https://smartodr.in" target="_blank" rel="noreferrer" className="text-decoration-none">Smart Online Dispute Resolution</a> &nbsp;|&nbsp; <a href="/grievance" className="text-decoration-none">Grievances Redressal Mechanism</a> &nbsp;|&nbsp; <a href="/project-jagrook" className="text-decoration-none">Project Jagrook by SEBI</a>
                    </p>

                    <p className="mb-3">
                        Investments in securities market are subject to market risks; read all the related documents carefully before investing.
                    </p>

                    <p className="mb-3">
                        Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
                    </p>

                    <p className="mb-3">
                        India&apos;s largest broker based on networth as per NSE. <a href="https://www.nseindia.com" target="_blank" rel="noreferrer" className="text-decoration-none">NSE broker factsheet</a>
                    </p>

                    <p className="mb-4">
                        &ldquo;Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers/depository participants. Receive information of your transactions directly from Exchange/Depositories on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.&rdquo; Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don&apos;t give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please <a href="/support" className="text-decoration-none">create a ticket here</a>.
                    </p>

                    {/* Bottom Links Bar */}
                    <div className="d-flex justify-content-center flex-wrap gap-4 text-muted pt-3 pb-2 footer-bottom-links">
                        <a href="https://www.nseindia.com" target="_blank" rel="noreferrer">NSE</a>
                        <a href="https://www.bseindia.com" target="_blank" rel="noreferrer">BSE</a>
                        <a href="https://www.mcxindia.com" target="_blank" rel="noreferrer">MCX</a>
                        <a href="https://www.msei.in" target="_blank" rel="noreferrer">MSEI</a>
                        <a href="/terms">Terms &amp; conditions</a>
                        <a href="/policies">Policies &amp; procedures</a>
                        <a href="/privacy">Privacy policy</a>
                        <a href="/disclosure">Disclosure</a>
                        <a href="/attention">For investor&apos;s attention</a>
                        <a href="/charter">Investor charter</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
