import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { buildKiteLaunchUrl } from "../config/api";
import "./NavbarDropdown.css";

function NavbarDropdown({ isOpen, onClose, currentUser }) {
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".nav-hamburger-btn")
      ) {
        onClose();
      }
    };

    // Close on Escape key
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Kite trading terminal URL (launch directly if logged in, otherwise go to /login)
  const kiteTargetUrl = currentUser
    ? buildKiteLaunchUrl(currentUser)
    : "/login";

  return (
    <div className="navbar-mega-dropdown" ref={dropdownRef}>
      {/* Top Products Section (Pure White) */}
      <div className="mega-top-section">
        <div className="mega-products-grid">
          {/* Kite */}
        {currentUser ? (
          <a
            href={kiteTargetUrl}
            className="mega-product-item"
            onClick={onClose}
            title="Launch Kite Trading Platform"
          >
            <div className="mega-product-icon-wrap">
              <img
                src="/media/images/kite-logo-dropdown.svg"
                alt="Kite Logo"
                className="mega-product-icon"
              />
            </div>
            <span className="mega-product-title">Kite</span>
            <span className="mega-product-subtitle">Trading platform</span>
          </a>
        ) : (
          <Link
            to="/login"
            className="mega-product-item"
            onClick={onClose}
            title="Login to Kite"
          >
            <div className="mega-product-icon-wrap">
              <img
                src="/media/images/kite-logo-dropdown.svg"
                alt="Kite Logo"
                className="mega-product-icon"
              />
            </div>
            <span className="mega-product-title">Kite</span>
            <span className="mega-product-subtitle">Trading platform</span>
          </Link>
        )}

        {/* Console */}
        <Link
          to="/products"
          className="mega-product-item"
          onClick={onClose}
          title="Console - Backoffice & Analytics"
        >
          <div className="mega-product-icon-wrap">
            <img
              src="/media/images/console-dropdown.svg"
              alt="Console Logo"
              className="mega-product-icon"
            />
          </div>
          <span className="mega-product-title">Console</span>
          <span className="mega-product-subtitle">Backoffice</span>
        </Link>

        {/* Kite Connect */}
        <Link
          to="/products"
          className="mega-product-item"
          onClick={onClose}
          title="Kite Connect Trading APIs"
        >
          <div className="mega-product-icon-wrap">
            <img
              src="/media/images/kite-connect-dropdown.svg"
              alt="Kite Connect Logo"
              className="mega-product-icon"
            />
          </div>
          <span className="mega-product-title">Kite Connect</span>
          <span className="mega-product-subtitle">Trading APIs</span>
        </Link>

        {/* Coin */}
        <Link
          to="/products"
          className="mega-product-item"
          onClick={onClose}
          title="Coin - Direct Mutual Funds"
        >
          <div className="mega-product-icon-wrap">
            <img
              src="/media/images/coin-dropdown.svg"
              alt="Coin Logo"
              className="mega-product-icon"
            />
          </div>
          <span className="mega-product-title">Coin</span>
          <span className="mega-product-subtitle">Mutual funds</span>
        </Link>
        </div>
      </div>

      {/* Bottom Categorized Links Section (Authentic Soft Grey) */}
      <div className="mega-bottom-section">
        <div className="mega-links-row">
          {/* Column 1: Utilities */}
        <div className="mega-link-col">
          <div className="mega-link-col-title">Utilities</div>
          <ul className="mega-links-list">
            <li>
              <Link to="/pricing" className="mega-link-item" onClick={onClose}>
                Calculators
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="mega-link-item" onClick={onClose}>
                Brokerage calculator
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="mega-link-item" onClick={onClose}>
                Margin calculator
              </Link>
            </li>
            <li>
              <Link to="/products" className="mega-link-item" onClick={onClose}>
                SIP calculator
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Updates */}
        <div className="mega-link-col">
          <div className="mega-link-col-title">Updates</div>
          <ul className="mega-links-list">
            <li>
              <Link to="/about" className="mega-link-item" onClick={onClose}>
                Z-Connect blog
              </Link>
            </li>
            <li>
              <Link to="/support" className="mega-link-item" onClick={onClose}>
                Circulars / Bulletin
              </Link>
            </li>
            <li>
              <Link to="/products" className="mega-link-item" onClick={onClose}>
                IPOs
              </Link>
            </li>
            <li>
              <Link to="/products" className="mega-link-item" onClick={onClose}>
                Markets
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Education */}
        <div className="mega-link-col">
          <div className="mega-link-col-title">Education</div>
          <div className="mega-education-row">
            {/* Varsity */}
            <Link
              to="/products"
              className="mega-education-item"
              onClick={onClose}
              title="Varsity - Financial Education"
            >
              <div className="mega-education-icon-wrap">
                <img
                  src="/media/images/varsity-dropdown.png"
                  alt="Varsity Shield Logo"
                  style={{ width: "32px", height: "auto" }}
                />
              </div>
              <span className="mega-education-title">Varsity</span>
            </Link>

            {/* Trading Q&A */}
            <Link
              to="/support"
              className="mega-education-item"
              onClick={onClose}
              title="Trading Q&A Community"
            >
              <div className="mega-education-icon-wrap">
                <img
                  src="/media/images/tqna-dropdown.png"
                  alt="Trading Q&A Logo"
                  style={{ width: "32px", height: "auto" }}
                />
              </div>
              <span className="mega-education-title">Trading Q&amp;A</span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default NavbarDropdown;
