import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav 
            className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3"
            style={{ borderColor: "#eee" }}
        >
            <div className="container">
                {/* Brand Logo - Increased size */}
                <Link className="navbar-brand p-0 d-flex align-items-center" to="/">
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
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0 gap-lg-4 gap-2">
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to ="/pricing">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">
                                Support
                            </Link>
                        </li>
                        {/* Formatted Hamburger Menu Button */}
                        <li className="nav-item d-none d-lg-block">
                            <button 
                                className="btn border-0 p-2 d-flex align-items-center justify-content-center nav-hamburger-btn" 
                                type="button" 
                                aria-label="Open menu"
                            >
                                <i className="fa-solid fa-bars fs-5"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
