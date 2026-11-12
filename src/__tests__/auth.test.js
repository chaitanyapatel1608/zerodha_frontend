import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { API_BASE, DASHBOARD_URL, buildKiteLaunchUrl } from "../config/api";
import Login from "../landing_page/login/Login";
import SignUp from "../landing_page/signup/SignUp";

describe("Frontend Security & Auth Regression Suite", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves environment endpoints and never embeds tokens or PII in Kite launch URLs", () => {
    expect(API_BASE).toMatch(/^https?:\/\//);
    expect(DASHBOARD_URL).toMatch(/^https?:\/\//);
    expect(buildKiteLaunchUrl(null)).toBe("/login");

    const launchUrl = buildKiteLaunchUrl({
      userId: "ZU1001",
      fullName: "Test Trader",
      email: "trader@example.com",
    });
    expect(launchUrl).toBe(`${DASHBOARD_URL}/`);
    expect(launchUrl).not.toContain("token=");
    expect(launchUrl).not.toContain("email=");
  });

  it("Login validates empty email and transitions safely to OTP verification step", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: "OTP sent",
        isLiveEmail: true,
      }),
    });

    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login to Kite/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole("button", { name: /Get OTP/i });
    expect(submitBtn).toBeDisabled();

    fireEvent.submit(container.querySelector("form"));
    expect(await screen.findByText(/Please enter your registered email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/e\.g\. name@gmail\.com/i), {
      target: { value: "trader@example.com" },
    });
    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Two-factor authentication/i)).toBeInTheDocument();
    });
  });

  it("SignUp renders registration portal without leaked pre-filled secrets", () => {
    const { container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /Continue & Verify Email/i })).toBeInTheDocument();
    const fullNameInput = container.querySelector('input[name="fullName"]');
    expect(fullNameInput).toHaveValue("");
  });
});
