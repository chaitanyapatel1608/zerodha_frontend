import { beforeEach, afterEach, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SignUp from "../landing_page/signup/SignUp";
import { API_BASE, getCsrfToken, setCsrfToken } from "../config/api";

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  setCsrfToken("");
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("signup verifies with credentials and stores only the display profile and CSRF state", async () => {
  const post = vi.spyOn(axios, "post")
    .mockResolvedValueOnce({ data: { success: true, isLiveEmail: true } })
    .mockResolvedValueOnce({ data: { success: true, token: "handoff-token", csrfToken: "test-csrf", user: {
      userId: "alice", fullName: "Alice Trader", role: "user", email: "alice@example.com", phone: "9876543210", pan: "ABCDE1234F",
    } } });
  const { container } = render(<MemoryRouter><SignUp /></MemoryRouter>);
  for (const [name, value] of Object.entries({ fullName: "Alice Trader", email: "alice@example.com", phone: "9876543210", pan: "ABCDE1234F", dob: "1990-01-01" })) {
    fireEvent.change(container.querySelector(`input[name="${name}"]`), { target: { value } });
  }
  fireEvent.click(screen.getByRole("button", { name: "Continue & Verify Email" }));
  await screen.findByLabelText("Verification digit 1");
  for (const [index, digit] of [..."123456"].entries()) fireEvent.change(screen.getByLabelText(`Verification digit ${index + 1}`), { target: { value: digit } });
  fireEvent.click(screen.getByRole("button", { name: "Verify & Open Demat Account" }));
  await screen.findByText(/Welcome, Alice Trader/);
  await screen.findByText("Redirecting to Kite Dashboard...");
  expect(post).toHaveBeenNthCalledWith(2, `${API_BASE}/verify-otp`, expect.objectContaining({ otp: "123456" }), { withCredentials: true });
  expect(JSON.parse(localStorage.getItem("zerodha_user"))).toEqual({ userId: "alice", fullName: "Alice Trader", role: "user" });
  expect(JSON.parse(sessionStorage.getItem("zerodha_user"))).toEqual({ userId: "alice", fullName: "Alice Trader", role: "user" });
  expect(localStorage.getItem("zerodha_token")).toBe("handoff-token");
  expect(sessionStorage.getItem("zerodha_token")).toBe("handoff-token");
  expect(getCsrfToken()).toBe("test-csrf");
});

it("signup sign-out preserves the session on failure and revokes it before clearing local state", async () => {
  localStorage.setItem("zerodha_user", JSON.stringify({ userId: "alice", fullName: "Alice Trader" }));
  localStorage.setItem("zerodha_token", "handoff-token");
  setCsrfToken("test-csrf");
  const post = vi.spyOn(axios, "post").mockRejectedValueOnce(new Error("unavailable")).mockResolvedValueOnce({ data: { success: true } });
  render(<MemoryRouter><SignUp /></MemoryRouter>);
  fireEvent.click(await screen.findByRole("button", { name: "Sign out from this account" }));
  await screen.findByText("Could not sign out securely. Please try again.");
  expect(localStorage.getItem("zerodha_token")).toBe("handoff-token");
  fireEvent.click(screen.getByRole("button", { name: "Sign out from this account" }));
  await waitFor(() => expect(localStorage.getItem("zerodha_user")).toBeNull());
  expect(post).toHaveBeenLastCalledWith(`${API_BASE}/logout`, {}, {
    withCredentials: true, headers: { Authorization: "Bearer handoff-token", "X-CSRF-Token": "test-csrf" },
  });
  expect(localStorage.getItem("zerodha_token")).toBeNull();
  expect(getCsrfToken()).toBe("");
});
