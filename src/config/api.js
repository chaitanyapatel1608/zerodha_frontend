// Centralized environment-aware API and cross-app navigation endpoints

const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
const protocol = typeof window !== "undefined" ? window.location.protocol : "http:";

export const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  (hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3002"
    : `${protocol}//${hostname}:3002`);

export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (hostname === "localhost" || hostname === "127.0.0.1"
    ? "http://localhost:3001"
    : `${protocol}//${hostname}:3001`);

export function buildKiteLaunchUrl(user) {
  if (!user) return "/login";
  const token = localStorage.getItem("zerodha_token") || "";
  const params = new URLSearchParams({
    token,
    userId: user.userId || "",
    name: user.fullName || "Trader",
    email: user.email || "",
  });
  if (user.pan) params.set("pan", user.pan);
  if (user.demat) params.set("demat", user.demat);
  // Pass session payload via URL fragment (#) so tokens are not logged in server access logs or Referer headers
  return `${DASHBOARD_URL}/#${params.toString()}`;
}
