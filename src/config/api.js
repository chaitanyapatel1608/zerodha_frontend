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

export function buildKiteLaunchUrl(user) {
  if (!user) return "/login";
  // Session is carried by HttpOnly SameSite cookie — never pass tokens or PII in URLs
  return `${DASHBOARD_URL}/`;
}
