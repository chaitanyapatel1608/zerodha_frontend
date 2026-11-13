import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";
import { API_BASE, buildKiteLaunchUrl, readCookie, getCsrfToken } from "../config/api";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Hide main navbar on Kite login screen matching kite.zerodha.com
  const isKiteLoginPage = location.pathname === "/login";

  // Helper to close all menus (mobile collapse + mega-dropdown)
  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsNavExpanded(false);
  };

  // Automatically close both dropdown and mobile menu on route transition
  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  // Close menus when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllMenus();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllMenus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const checkAuth = () => {
    try {
      const stored = localStorage.getItem("zerodha_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    const handleAuthChange = (e) => setCurrentUser(e.detail);
    window.addEventListener("zerodha_auth_change", handleAuthChange);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("zerodha_auth_change", handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const csrf = getCsrfToken();
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
        headers: csrf ? { "X-CSRF-Token": csrf } : {},
      });
    } catch (_) {}
    localStorage.removeItem("zerodha_token");
    localStorage.removeItem("zerodha_user");
    localStorage.removeItem("zerodha_csrf");
    try {
      sessionStorage.removeItem("zerodha_csrf");
    } catch (_) {}
    setCurrentUser(null);
    closeAllMenus();
    window.dispatchEvent(new Event("storage"));
  };

  if (isKiteLoginPage) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3"
      style={{ borderColor: "#eee" }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link
          className="navbar-brand p-0 d-flex align-items-center"
          to="/"
          onClick={closeAllMenus}
        >
          <img
            src="/media/images/logo.svg"
            alt="Zerodha Logo"
            style={{ width: "160px" }}
          />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsNavExpanded((prev) => !prev)}
          aria-expanded={isNavExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0 gap-lg-4 gap-2">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <a
                    className="btn btn-sm text-white px-3 py-1 fw-semibold d-flex align-items-center gap-1 shadow-sm"
                    href={buildKiteLaunchUrl(currentUser)}
                    style={{ backgroundColor: "#387ed1", borderRadius: "4px" }}
                    onClick={closeAllMenus}
                  >
                    <span>Kite</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "11px" }}></i>
                  </a>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-link d-flex align-items-center gap-2 py-0"
                    title="Account details"
                    onClick={closeAllMenus}
                  >
                    <span
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{
                        width: "28px",
                        height: "28px",
                        backgroundColor: "#f5a623",
                        fontSize: "12px",
                      }}
                    >
                      {currentUser.avatarText || "CU"}
                    </span>
                    <span className="fw-semibold text-dark small">{currentUser.userId}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-link text-muted text-decoration-none p-0 small"
                    title="Logout"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/signup" onClick={closeAllMenus}>
                  Signup
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeAllMenus}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={closeAllMenus}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={closeAllMenus}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support" onClick={closeAllMenus}>
                Support
              </Link>
            </li>

            {/* Ecosystem Hamburger Mega-Menu */}
            <li className="nav-item position-relative">
              <button
                className={`nav-hamburger-btn ${isDropdownOpen ? "active" : ""}`}
                type="button"
                aria-label="Open Zerodha Ecosystem menu"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                title="Zerodha products and apps"
              >
                <div className="nav-hamburger-icon">
                  <span />
                  <span />
                  <span />
                </div>
              </button>
              <NavbarDropdown
                isOpen={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                currentUser={currentUser}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
