import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../landing_page/NotFound";
import Login from "../landing_page/login/Login";
import Navbar from "../landing_page/Navbar";

describe("Frontend Component & Error-State Suite", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("NotFound renders 404 heading and Go Home link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go Home/i })).toHaveAttribute("href", "/");
  });

  it("Login displays server error message when /send-otp fails and handles network error gracefully", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ success: false, message: "Too many OTP requests." }),
      })
      .mockRejectedValueOnce(new Error("Network down"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/e\.g\. name@gmail\.com/i);
    fireEvent.change(emailInput, { target: { value: "trader@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /Get OTP/i }));

    await waitFor(() => {
      expect(screen.getByText(/Too many OTP requests\./i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Get OTP/i }));
    await waitFor(() => {
      expect(screen.getByText(/Network|unable|failed|error/i)).toBeInTheDocument();
    });
  });

  it("Navbar switches between guest and authenticated user state cleanly", () => {
    const { unmount } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Signup/i })).toBeInTheDocument();
    unmount();

    localStorage.setItem(
      "zerodha_user",
      JSON.stringify({ userId: "ZU1001", fullName: "Test Trader", email: "trader@example.com" })
    );
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Test Trader|ZU1001|Launch Kite/i)).toBeInTheDocument();
  });
});
