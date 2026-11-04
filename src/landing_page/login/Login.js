import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const API_BASE = "http://localhost:3002";

function Login() {
  // Form State
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP
  const [maskedEmail, setMaskedEmail] = useState("");

  // Loading & Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: "error" | "success", message: "", showSignupLink?: boolean }
  const [resendCooldown, setResendCooldown] = useState(0);

  // Helper to mask email for display (e.g. ch***@gmail.com)
  const maskEmailAddress = (rawEmail) => {
    if (!rawEmail || !rawEmail.includes("@")) return rawEmail;
    const [user, domain] = rawEmail.split("@");
    if (user.length <= 2) return `${user}***@${domain}`;
    return `${user.slice(0, 2)}***${user.slice(-1)}@${domain}`;
  };

  // Step 1: Send OTP to Gmail
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setAlert(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setAlert({
        type: "error",
        message: "Please enter your registered email address.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          type: "login",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.code === "USER_NOT_FOUND") {
          setAlert({
            type: "error",
            message: data.message || `No account registered with ${cleanEmail}.`,
            showSignupLink: true,
          });
        } else {
          setAlert({
            type: "error",
            message: data.message || "Failed to dispatch verification code.",
          });
        }
        setIsLoading(false);
        return;
      }

      // Success - Advance to Step 2 (OTP Verification)
      setMaskedEmail(maskEmailAddress(cleanEmail));
      setStep(2);
      setIsLoading(false);
      setAlert({
        type: "success",
        message: data.devOtp
          ? `Verification code dispatched! (Development OTP: ${data.devOtp})`
          : `A 6-digit verification code has been sent to ${cleanEmail}`,
      });

      // Start 30s resend timer
      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("OTP send error:", err);
      setAlert({
        type: "error",
        message: "Unable to connect to authentication server. Please ensure backend is running.",
      });
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP & Launch Kite Terminal
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAlert(null);

    const cleanOtp = otp.trim();
    if (!cleanOtp || !/^\d{6}$/.test(cleanOtp)) {
      setAlert({
        type: "error",
        message: "Please enter the 6-digit numeric OTP code.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: cleanOtp,
          type: "login",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAlert({
          type: "error",
          message: data.message || "Invalid OTP code. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      // Persist session
      localStorage.setItem("zerodha_token", data.token);
      localStorage.setItem("zerodha_user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new CustomEvent("zerodha_auth_change", { detail: data.user }));

      setAlert({
        type: "success",
        message: `Welcome back, ${data.user.fullName || data.user.userId}! Launching Kite...`,
      });

      // Redirect directly to Kite Trading Dashboard
      setTimeout(() => {
        window.location.href = `http://localhost:3001?token=${data.token}&userId=${data.user.userId}&name=${encodeURIComponent(
          data.user.fullName || "Trader"
        )}&email=${encodeURIComponent(data.user.email || "")}&pan=${encodeURIComponent(
          data.user.pan || ""
        )}&demat=${encodeURIComponent(data.user.demat || "")}`;
      }, 700);
    } catch (err) {
      console.error("OTP verify error:", err);
      setAlert({
        type: "error",
        message: "Verification failed. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="kite-login-wrapper">
      {/* Central Login Card */}
      <div className="kite-login-card">
        {/* Kite Red Official SVG Logo */}
        <Link to="/" title="Zerodha Home">
          <img
            src="/media/images/kite-logo-dropdown.svg"
            alt="Zerodha Kite Logo"
            className="kite-card-logo"
          />
        </Link>

        {/* Card Title */}
        <h2 className="kite-login-title">
          {step === 1 ? "Login to Kite" : "Two-factor authentication"}
        </h2>

        {/* Feedback Alert */}
        {alert && (
          <div className={`kite-alert-box kite-alert-${alert.type}`}>
            <i
              className={`fa-solid ${
                alert.type === "error" ? "fa-circle-exclamation" : "fa-circle-check"
              } mt-1`}
            ></i>
            <div>
              <span>{alert.message}</span>
              {alert.showSignupLink && (
                <div className="mt-1">
                  <Link
                    to="/signup"
                    className="fw-semibold text-danger text-decoration-underline"
                  >
                    Open a free Demat account here &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 1: Enter Email / Client ID for Gmail OTP */}
        {step === 1 ? (
          <form onSubmit={handleSendOtp} noValidate>
            <div className="kite-form-group">
              <label className="kite-input-label" htmlFor="kite-email">
                Registered Email Address
              </label>
              <input
                id="kite-email"
                type="email"
                className="kite-input-control"
                placeholder="e.g. name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                autoFocus
              />
              <span className="kite-field-helper">
                We will send a 6-digit one-time password to your Gmail inbox.
              </span>
            </div>

            {/* Orange Kite Login Button */}
            <button
              type="submit"
              className="kite-login-btn"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Sending OTP...</span>
                </>
              ) : (
                "Get OTP"
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: Enter 6-digit Gmail OTP */
          <form onSubmit={handleVerifyOtp} noValidate>
            <p className="kite-otp-subtitle">
              Enter the 6-digit verification code sent to <br />
              <strong className="text-dark">{maskedEmail}</strong>
            </p>

            <div className="kite-form-group text-center">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="kite-input-control kite-otp-input text-center fw-bold letter-spacing-3"
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="kite-login-btn"
              disabled={isLoading || otp.trim().length !== 6}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Verifying...</span>
                </>
              ) : (
                "Continue to Kite"
              )}
            </button>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <button
                type="button"
                className="btn btn-sm btn-link text-muted p-0 text-decoration-none small"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setAlert(null);
                }}
              >
                &larr; Change email
              </button>

              <button
                type="button"
                className="btn btn-sm btn-link p-0 text-decoration-none small"
                style={{ color: resendCooldown > 0 ? "#9e9e9e" : "#387ed1" }}
                disabled={resendCooldown > 0 || isLoading}
                onClick={handleSendOtp}
              >
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Footer Area Matching User Screenshot */}
      <footer className="kite-login-footer">
        {/* App Store Badges */}
        <div className="kite-store-badges">
          <a
            href="https://play.google.com/store/apps/details?id=com.zerodha.kite3"
            target="_blank"
            rel="noreferrer"
            title="Download Kite on Google Play"
          >
            <i className="fa-brands fa-google-play"></i>
          </a>
          <a
            href="https://apps.apple.com/in/app/kite-by-zerodha/id1449453802"
            target="_blank"
            rel="noreferrer"
            title="Download Kite on App Store"
          >
            <i className="fa-brands fa-apple"></i>
          </a>
        </div>

        {/* Zerodha Brand Watermark */}
        <Link to="/" className="kite-watermark" title="Back to Zerodha Home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 4H20V20H4V4Z" stroke="#888" strokeWidth="2.5" />
            <path d="M4 12H20" stroke="#888" strokeWidth="2" />
          </svg>
          <span>ZERODHA</span>
        </Link>

        {/* Sign up prompt */}
        <p className="kite-signup-prompt">
          Don&apos;t have an account? <Link to="/signup">Sign up for free!</Link>
        </p>

        {/* Regulatory Disclaimers */}
        <p className="kite-regulatory-text">
          Zerodha Broking Limited: Member of{" "}
          <Link to="/pricing">NSE, BSE, MCX</Link> - SEBI Reg. no. INZ000031633. CDSL - SEBI Reg. no.
          IN-DP-431-2019 |{" "}
          <a href="https://smartodr.in" target="_blank" rel="noreferrer">
            Smart Online Dispute Resolution
          </a>{" "}
          |{" "}
          <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer">
            SEBI SCORES
          </a>
        </p>

        {/* Version string */}
        <span className="kite-version">v3.0.0</span>
      </footer>
    </div>
  );
}

export default Login;
