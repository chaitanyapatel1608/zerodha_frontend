import React, { useEffect } from "react";
import { DASHBOARD_URL } from "../config/api";

const TradingRouteBridge = ({ targetPath = "/funds" }) => {
  useEffect(() => {
    try {
      let token = "";
      if (typeof window !== "undefined") {
        token =
          sessionStorage.getItem("zerodha_token") ||
          localStorage.getItem("zerodha_token") ||
          "";
      }

      const targetUrl = `${DASHBOARD_URL}${targetPath}`;

      if (token) {
        // Pass token in URL fragment for cross-subdomain authorization handoff
        window.location.replace(`${targetUrl}#token=${encodeURIComponent(token)}`);
      } else {
        // Redirect to login preserving intended target path
        const redirectParam = encodeURIComponent(targetUrl);
        window.location.replace(`/login?redirect_uri=${redirectParam}`);
      }
    } catch (e) {
      window.location.replace(`${DASHBOARD_URL}${targetPath}`);
    }
  }, [targetPath]);

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fbfbfb",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "420px", padding: "20px" }}>
        <img
          src="/media/images/kite-logo-dropdown.svg"
          alt="Zerodha Kite"
          style={{ width: "48px", height: "auto", marginBottom: "16px" }}
          onError={(e) => {
            e.currentTarget.src = "/media/images/logo.svg";
          }}
        />
        <h4 style={{ fontSize: "17px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>
          Redirecting to Kite Trading Terminal...
        </h4>
        <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
          Routing to <strong>{targetPath}</strong>. Checking your broker session.
        </p>
        <div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default TradingRouteBridge;
