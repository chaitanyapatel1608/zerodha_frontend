// Centralized environment-aware API and cross-app navigation endpoints

const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
const protocol = typeof window !== "undefined" ? window.location.protocol : "http:";
const isRender = typeof window !== "undefined" && window.location.hostname.includes("onrender.com");

function readEnv(viteKey, legacyKey) {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env[viteKey]) return import.meta.env[viteKey];
      if (import.meta.env[legacyKey]) return import.meta.env[legacyKey];
    }
  } catch (e) {}
  try {
    if (typeof process !== "undefined" && process.env && process.env[legacyKey]) {
      return process.env[legacyKey];
    }
  } catch (e) {}
  return "";
}

export const API_BASE =
  readEnv("VITE_API_BASE_URL", "REACT_APP_API_BASE_URL") ||
  (isRender
    ? "https://zerodha-backend-xbtx.onrender.com"
    : hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3002"
    : `${protocol}//${hostname}:3002`);

export const DASHBOARD_URL =
  readEnv("VITE_DASHBOARD_URL", "REACT_APP_DASHBOARD_URL") ||
  (isRender
    ? "https://zerodha-dashboard-6zf2.onrender.com"
    : hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : `${protocol}//${hostname}:3001`);

export function readCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

let inMemoryCsrf = "";

export function setCsrfToken(token) {
  if (!token) {
    inMemoryCsrf = "";
    try { sessionStorage.removeItem("zerodha_csrf"); } catch {}
    try { localStorage.removeItem("zerodha_csrf"); } catch {}
    return;
  }
  if (token) {
    inMemoryCsrf = token;
    try {
      if (typeof sessionStorage !== "undefined") sessionStorage.setItem("zerodha_csrf", token);
    } catch (e) {}
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem("zerodha_csrf", token);
    } catch (e) {}
  }
}

export function getCsrfToken() {
  const cookieVal = readCookie("zerodha_csrf");
  if (cookieVal) return cookieVal;
  if (inMemoryCsrf) return inMemoryCsrf;
  try {
    if (typeof sessionStorage !== "undefined") {
      const s = sessionStorage.getItem("zerodha_csrf");
      if (s) return s;
    }
  } catch (e) {}
  try {
    if (typeof localStorage !== "undefined") {
      const l = localStorage.getItem("zerodha_csrf");
      if (l) return l;
    }
  } catch (e) {}
  return "";
}

function isValidDashboardRedirect(url) {
  if (!url) return false;
  try {
    if (url.startsWith("/")) return true;
    const parsed = new URL(url);
    const parsedDash = new URL(DASHBOARD_URL);
    return (
      parsed.origin === parsedDash.origin ||
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname.endsWith(".onrender.com")
    );
  } catch {
    return false;
  }
}

export function buildKiteLaunchUrl(user, token, redirectUri = "") {
  if (!user) return "/login";
  let base = `${DASHBOARD_URL}/`;
  if (redirectUri && isValidDashboardRedirect(redirectUri)) {
    if (redirectUri.startsWith("/")) {
      base = `${DASHBOARD_URL}${redirectUri}`;
    } else {
      base = redirectUri;
    }
  }

  // When redirecting back to backend actions (e.g. fundDeposit/action or ipoMandate/action),
  // pass the auth_token in query params so the server can authenticate and set cookies.
  if (token && (base.includes("/fundDeposit/action") || base.includes("/ipoMandate/action") || base.includes("backend"))) {
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}auth_token=${encodeURIComponent(token)}`;
  }

  if (token) {
    const [pathPart] = base.split("#");
    return `${pathPart}#token=${encodeURIComponent(token)}`;
  }
  return base;
}
