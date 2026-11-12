import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_BASE, buildKiteLaunchUrl } from "../../config/api";

function SignUp() {
  // Mode: "signup" (full KYC registration) vs "login" (quick returning user login)
  const [mode, setMode] = useState("signup");

  // Step: 1 = Details Input, 2 = OTP Verification, 3 = Account Provisioned / Authenticated
  const [step, setStep] = useState(1);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pan: "",
    dob: "",
    annualIncome: "₹1L - ₹5L",
    tradingExp: "1-3 Years",
    agreeTerms: true,
  });

  // Validation Errors per field
  const [fieldErrors, setFieldErrors] = useState({});

  // Account Existence State
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // OTP & Verification State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtp, setDevOtp] = useState("");
  const [isLiveEmail, setIsLiveEmail] = useState(false);

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [userProfile, setUserProfile] = useState(null);

  const otpInputsRef = useRef([]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("zerodha_user");
    const savedToken = localStorage.getItem("zerodha_token");
    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserProfile(parsed);
        setStep(3);
      } catch (e) {
        localStorage.removeItem("zerodha_user");
        localStorage.removeItem("zerodha_token");
      }
    }
  }, []);

  // 30s Countdown timer for OTP Resend
  useEffect(() => {
    let interval = null;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Focus first OTP box when entering Step 2
  useEffect(() => {
    if (step === 2 && otpInputsRef.current[0]) {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Generic form input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field-level error as user edits
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle PAN input formatting (Force uppercase, max 10 chars)
  const handlePanChange = (e) => {
    const uppercase = e.target.value.toUpperCase().slice(0, 10);
    setFormData((prev) => ({ ...prev, pan: uppercase }));
    if (fieldErrors.pan) {
      setFieldErrors((prev) => ({ ...prev, pan: "" }));
    }
  };

  // Handle Mobile input (numeric only, max 10 digits)
  const handlePhoneChange = (e) => {
    const numbersOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: numbersOnly }));
    if (fieldErrors.phone) {
      setFieldErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Comprehensive Form Validation
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Email validation (Applies to both signup and login)
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    // Additional validations for Signup / Demat Account Opening
    if (mode === "signup") {
      // 1. Full Legal Name (Letters and spaces only, min 3 chars)
      const nameRegex = /^[a-zA-Z\s.]{3,50}$/;
      if (!formData.fullName || !formData.fullName.trim()) {
        errors.fullName = "Full legal name as per PAN card is required";
      } else if (!nameRegex.test(formData.fullName.trim())) {
        errors.fullName = "Name must be at least 3 letters and contain only alphabets";
      }

      // 2. Mobile Phone (Exactly 10 digits, starts with 6, 7, 8, 9)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!formData.phone) {
        errors.phone = "10-digit mobile number is required";
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
      }

      // 3. PAN Card Number (5 uppercase letters, 4 digits, 1 uppercase letter)
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!formData.pan) {
        errors.pan = "PAN card number is required for Demat KYC";
      } else if (!panRegex.test(formData.pan)) {
        errors.pan = "Invalid PAN format. Must be 5 letters, 4 numbers, 1 letter (e.g. ABCDE1234F)";
      }

      // 4. Date of Birth (SEBI 18+ Age Validation)
      if (!formData.dob) {
        errors.dob = "Date of birth is required";
      } else {
        const dobDate = new Date(formData.dob);
        const today = new Date();
        if (dobDate > today) {
          errors.dob = "Date of birth cannot be in the future";
        } else {
          let age = today.getFullYear() - dobDate.getFullYear();
          const monthDiff = today.getMonth() - dobDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
          }
          if (age < 18) {
            errors.dob = `You must be at least 18 years old to open a Demat account (Calculated age: ${age} yrs)`;
          }
        }
      }

      // 5. Terms & KYC authorization checkbox
      if (!formData.agreeTerms) {
        errors.agreeTerms = "You must authorize PAN KYC and accept Zerodha terms";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submission -> Send OTP
  const handleSubmitDetails = async (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Run full validation check
    const isValid = validateForm();
    if (!isValid) {
      setErrorMsg("Please correct the errors marked in red below.");
      return;
    }

    setAlreadyExists(false);
    setUserNotFound(false);
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/send-otp`, {
        email: formData.email,
        fullName: formData.fullName,
        type: mode,
        pan: formData.pan,
        phone: formData.phone,
      });

      if (response.data.success) {
        setIsLiveEmail(Boolean(response.data.isLiveEmail));
        setDevOtp(response.data.devOtp || "");
        setSuccessMsg(
          response.data.isLiveEmail
            ? `Verification code sent to ${formData.email}. Please check your inbox.`
            : `OTP sent to ${formData.email}`
        );
        setResendTimer(30);
        setStep(2);
      } else {
        setErrorMsg(response.data.message || "Failed to dispatch OTP. Please try again.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      const code = err.response?.data?.code;
      if (code === "USER_ALREADY_EXISTS") {
        setAlreadyExists(true);
      } else if (code === "USER_NOT_FOUND") {
        setUserNotFound(true);
      } else {
        setErrorMsg(
          err.response?.data?.message || "Could not reach the authentication server. Please verify the backend service is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Digit Input & Focus Shifting
  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split("");
      pasted.forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(pasted.length, 5);
      otpInputsRef.current[nextFocus]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleAutoFillDevOtp = () => {
    if (devOtp && devOtp.length === 6) {
      setOtp(devOtp.split(""));
    }
  };

  // Verify OTP & Complete Account Creation
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/verify-otp`, {
        email: formData.email,
        otp: fullOtp,
        type: mode,
        fullName: formData.fullName || "Trader",
        phone: formData.phone,
        pan: formData.pan,
        dob: formData.dob,
        annualIncome: formData.annualIncome,
        tradingExp: formData.tradingExp,
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem("zerodha_token", token);
        localStorage.setItem("zerodha_user", JSON.stringify(user));

        // Notify Navbar across the app
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("zerodha_auth_change", { detail: user }));

        setUserProfile(user);
        setStep(3);
        setSuccessMsg("Account verified successfully! Welcome to Zerodha.");
      } else {
        setErrorMsg(response.data.message || "Invalid OTP code.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      setErrorMsg(
        err.response?.data?.message || "Invalid OTP code. Please check and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("zerodha_token");
    localStorage.removeItem("zerodha_user");
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new CustomEvent("zerodha_auth_change", { detail: null }));
    setUserProfile(null);
    setStep(1);
    setOtp(["", "", "", "", "", ""]);
    setDevOtp("");
    setSuccessMsg("");
    setErrorMsg("");
    setFieldErrors({});
  };

  return (
    <div className="container py-4 py-lg-5" style={{ minHeight: "80vh" }}>
      <div className="row align-items-start justify-content-center">
        
        {/* Left Column: Visual Brand Illustration & Value Proposition */}
        <div className="col-12 col-lg-5 text-center text-lg-start mb-5 mb-lg-0 pe-lg-4 mt-lg-3">
          <img
            src="/media/images/signup.png"
            alt="Zerodha Demat Account Opening"
            className="img-fluid mb-4"
            style={{ maxWidth: "88%", height: "auto" }}
          />
          <h2 className="fs-3 fw-bold text-dark mb-2">
            Open a free demat &amp; trading account
          </h2>
          <p className="text-muted fs-6 mb-4">
            Join 1.5+ crore investors &amp; traders on India&apos;s leading discount broker.
          </p>

          <div className="d-flex flex-column gap-2 text-muted small">
            <div className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-circle-check text-success"></i>
              <span><strong>₹0</strong> brokerage on equity delivery &amp; direct mutual funds</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-circle-check text-success"></i>
              <span>Flat <strong>₹20</strong> or 0.03% max per executed order for Intraday &amp; F&amp;O</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <i className="fa-solid fa-circle-check text-success"></i>
              <span>100% paperless onboarding via online KYC and instant Demat allocation</span>
            </div>
          </div>
        </div>

        {/* Right Column: Comprehensive Professional Form Card */}
        <div className="col-12 col-lg-7 col-xl-6">
          <div
            className="p-4 p-md-5 bg-white border rounded-3 shadow-sm"
            style={{ borderColor: "#e5e5e5", margin: "0 auto" }}
          >
            {/* Interactive "User Already Exists" Card */}
            {alreadyExists && (
              <div
                className="p-3 mb-3 rounded-3 border d-flex flex-column gap-2"
                style={{ backgroundColor: "#fff9e6", borderColor: "#ffe082" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation text-warning fs-5"></i>
                  <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                    Account Already Exists!
                  </span>
                </div>
                <p className="mb-0 text-muted small" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                  An active Zerodha account is already registered with <strong>{formData.email}</strong>. Each email address can only be associated with one account.
                </p>
                <div className="mt-1">
                  <button
                    type="button"
                    className="btn btn-sm text-white fw-semibold px-3 py-1.5 shadow-sm d-inline-flex align-items-center gap-1.5"
                    style={{ backgroundColor: "#387ed1", fontSize: "13px" }}
                    onClick={() => {
                      setMode("login");
                      setAlreadyExists(false);
                      setErrorMsg("");
                    }}
                  >
                    <span>Click here to Login</span>
                    <i className="fa-solid fa-arrow-right small"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Interactive "User Not Found" Card */}
            {userNotFound && (
              <div
                className="p-3 mb-3 rounded-3 border d-flex flex-column gap-2"
                style={{ backgroundColor: "#eef5fc", borderColor: "#b8d7f7" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-user-plus text-primary fs-5"></i>
                  <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                    No Account Found
                  </span>
                </div>
                <p className="mb-0 text-muted small" style={{ fontSize: "13px", lineHeight: "1.5" }}>
                  We could not find an existing Zerodha account for <strong>{formData.email}</strong>. Please complete the registration below to open your account.
                </p>
                <div className="mt-1">
                  <button
                    type="button"
                    className="btn btn-sm text-white fw-semibold px-3 py-1.5 shadow-sm d-inline-flex align-items-center gap-1.5"
                    style={{ backgroundColor: "#387ed1", fontSize: "13px" }}
                    onClick={() => {
                      setMode("signup");
                      setUserNotFound(false);
                      setErrorMsg("");
                    }}
                  >
                    <span>Open a New Demat Account</span>
                    <i className="fa-solid fa-arrow-right small"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Global Error Banner */}
            {errorMsg && (
              <div
                className="alert alert-danger py-2 px-3 small d-flex align-items-center justify-content-between mb-3"
                role="alert"
              >
                <span>{errorMsg}</span>
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  aria-label="Close"
                  onClick={() => setErrorMsg("")}
                  style={{ fontSize: "10px" }}
                ></button>
              </div>
            )}

            {/* Global Success Banner */}
            {successMsg && step !== 3 && (
              <div
                className="alert alert-success py-2 px-3 small d-flex align-items-center justify-content-between mb-3"
                role="alert"
              >
                <span>{successMsg}</span>
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  aria-label="Close"
                  onClick={() => setSuccessMsg("")}
                  style={{ fontSize: "10px" }}
                ></button>
              </div>
            )}

            {/* STAGE 1: PROFESSIONAL ONBOARDING / LOGIN FORM */}
            {step === 1 && (
              <div>
                {/* Mode Selector Tabs (Sign Up vs Login) */}
                <div
                  className="d-flex p-1 bg-light rounded-pill mb-4 border"
                  style={{ maxWidth: "340px" }}
                >
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill rounded-pill py-2 fw-semibold ${
                      mode === "signup"
                        ? "btn-white bg-white text-primary shadow-sm"
                        : "text-muted border-0"
                    }`}
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setMode("signup");
                      setErrorMsg("");
                      setFieldErrors({});
                    }}
                  >
                    Open New Account
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill rounded-pill py-2 fw-semibold ${
                      mode === "login"
                        ? "btn-white bg-white text-primary shadow-sm"
                        : "text-muted border-0"
                    }`}
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setMode("login");
                      setErrorMsg("");
                      setFieldErrors({});
                    }}
                  >
                    Login with OTP
                  </button>
                </div>

                {mode === "signup" ? (
                  /* ================= FULL SIGNUP / DEMAT APPLICATION FORM ================= */
                  <div>
                    <h3 className="fw-bold fs-4 text-dark mb-1">Demat Account Registration</h3>
                    <p className="text-muted small mb-4">
                      Complete your SEBI-mandated KYC profile to open your trading account.
                    </p>

                    <form onSubmit={handleSubmitDetails} noValidate>
                      {/* Section 1: Personal Information */}
                      <div className="mb-3">
                        <label className="form-label small text-muted fw-semibold mb-1">
                          Full Legal Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`form-control py-2 ${fieldErrors.fullName ? "is-invalid" : ""}`}
                          placeholder="e.g. Chaitanya Patel (as on PAN)"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          style={{ fontSize: "14px" }}
                        />
                        {fieldErrors.fullName ? (
                          <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                            {fieldErrors.fullName}
                          </div>
                        ) : (
                          <div className="form-text text-muted" style={{ fontSize: "11px" }}>
                            Must match your official PAN card record exactly.
                          </div>
                        )}
                      </div>

                      {/* Row: Email & Mobile Number */}
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            Email Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`form-control py-2 ${fieldErrors.email ? "is-invalid" : ""}`}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{ fontSize: "14px" }}
                          />
                          {fieldErrors.email && (
                            <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                              {fieldErrors.email}
                            </div>
                          )}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <div className="input-group has-validation">
                            <span className="input-group-text bg-light text-muted small fw-semibold px-2">
                              +91
                            </span>
                            <input
                              type="tel"
                              name="phone"
                              className={`form-control py-2 ${fieldErrors.phone ? "is-invalid" : ""}`}
                              placeholder="98765 43210"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              style={{ fontSize: "14px" }}
                            />
                          </div>
                          {fieldErrors.phone && (
                            <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                              {fieldErrors.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 2: KYC & Identification */}
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            PAN Card Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="pan"
                            className={`form-control py-2 text-uppercase fw-semibold ${
                              fieldErrors.pan ? "is-invalid" : ""
                            }`}
                            placeholder="ABCDE1234F"
                            maxLength="10"
                            value={formData.pan}
                            onChange={handlePanChange}
                            style={{ fontSize: "14px", letterSpacing: "1px" }}
                          />
                          {fieldErrors.pan ? (
                            <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                              {fieldErrors.pan}
                            </div>
                          ) : (
                            <div className="form-text text-muted" style={{ fontSize: "11px" }}>
                              Format: 5 letters, 4 digits, 1 letter.
                            </div>
                          )}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            Date of Birth <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="dob"
                            className={`form-control py-2 ${fieldErrors.dob ? "is-invalid" : ""}`}
                            value={formData.dob}
                            onChange={handleInputChange}
                            style={{ fontSize: "14px" }}
                          />
                          {fieldErrors.dob ? (
                            <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                              {fieldErrors.dob}
                            </div>
                          ) : (
                            <div className="form-text text-muted" style={{ fontSize: "11px" }}>
                              Must be 18+ years of age.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section 3: Investor Profile */}
                      <div className="row g-3 mb-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            Annual Income Range
                          </label>
                          <select
                            name="annualIncome"
                            className="form-select py-2"
                            value={formData.annualIncome}
                            onChange={handleInputChange}
                            style={{ fontSize: "14px" }}
                          >
                            <option value="Below ₹1 Lakh">Below ₹1 Lakh</option>
                            <option value="₹1L - ₹5L">₹1 Lakh - ₹5 Lakhs</option>
                            <option value="₹5L - ₹10L">₹5 Lakhs - ₹10 Lakhs</option>
                            <option value="₹10L - ₹25L">₹10 Lakhs - ₹25 Lakhs</option>
                            <option value="Above ₹25 Lakhs">Above ₹25 Lakhs</option>
                          </select>
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="form-label small text-muted fw-semibold mb-1">
                            Trading Experience
                          </label>
                          <select
                            name="tradingExp"
                            className="form-select py-2"
                            value={formData.tradingExp}
                            onChange={handleInputChange}
                            style={{ fontSize: "14px" }}
                          >
                            <option value="Beginner (< 1 Year)">Beginner (&lt; 1 Year)</option>
                            <option value="1-3 Years">1 - 3 Years</option>
                            <option value="3-5 Years">3 - 5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                          </select>
                        </div>
                      </div>

                      {/* KYC Declaration Checkbox */}
                      <div className="form-check mb-4">
                        <input
                          className={`form-check-input ${fieldErrors.agreeTerms ? "is-invalid" : ""}`}
                          type="checkbox"
                          name="agreeTerms"
                          id="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label text-muted small"
                          htmlFor="agreeTerms"
                          style={{ fontSize: "12px", lineHeight: "1.4" }}
                        >
                          I authorize Zerodha Broking Ltd. to verify my PAN records with NSDL/CDSL and complete my paperless KYC registration.
                        </label>
                        {fieldErrors.agreeTerms && (
                          <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                            {fieldErrors.agreeTerms}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-2.5 fw-medium text-white shadow-sm"
                        disabled={loading}
                        style={{ backgroundColor: "#387ed1", fontSize: "15px" }}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Continue & Verify Email"
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* ================= QUICK RETURNING USER LOGIN ================= */
                  <div>
                    <h3 className="fw-bold fs-4 text-dark mb-1">Login to Kite</h3>
                    <p className="text-muted small mb-4">
                      Enter your registered email address to receive an instant verification code.
                    </p>

                    <form onSubmit={handleSubmitDetails} noValidate>
                      <div className="mb-4">
                        <label className="form-label small text-muted fw-semibold mb-1">
                          Registered Email Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control py-2.5 ${fieldErrors.email ? "is-invalid" : ""}`}
                          placeholder="e.g. name@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ fontSize: "14px" }}
                        />
                        {fieldErrors.email && (
                          <div className="invalid-feedback d-block small" style={{ fontSize: "12px" }}>
                            {fieldErrors.email}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 py-2.5 fw-medium text-white shadow-sm"
                        disabled={loading}
                        style={{ backgroundColor: "#387ed1", fontSize: "15px" }}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Get Verification Code"
                        )}
                      </button>
                    </form>
                  </div>
                )}

                <p
                  className="text-muted mt-4 text-center mb-0"
                  style={{ fontSize: "12px", lineHeight: "1.5" }}
                >
                  By proceeding, you agree to Zerodha&apos;s{" "}
                  <a href="#terms" className="text-decoration-none" style={{ color: "#387ed1" }}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-decoration-none" style={{ color: "#387ed1" }}>
                    Privacy Policy
                  </a>.
                </p>
              </div>
            )}

            {/* STAGE 2: 6-DIGIT OTP VERIFICATION */}
            {step === 2 && (
              <div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h3 className="fw-bold fs-4 text-dark mb-0">Verify Email</h3>
                  <button
                    className="btn btn-sm btn-link text-decoration-none p-0"
                    style={{ color: "#387ed1", fontSize: "13px" }}
                    onClick={() => {
                      setStep(1);
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    <i className="fa-solid fa-pen me-1"></i>Edit Details
                  </button>
                </div>

                <p className="text-muted small mb-3">
                  A 6-digit verification code was sent to <strong>{formData.email}</strong>
                </p>

                {/* Live Email Confirmation or Developer Mode OTP Quick Helper */}
                {isLiveEmail ? (
                  <div
                    className="p-2.5 mb-3 rounded-2 d-flex align-items-center gap-2"
                    style={{ backgroundColor: "#e8f5e9", border: "1px solid #c8e6c9" }}
                  >
                    <i className="fa-solid fa-envelope-circle-check text-success fs-5"></i>
                    <span className="small text-dark" style={{ fontSize: "12px" }}>
                      Verification email sent. Check your inbox (or Spam/Promotions folder).
                    </span>
                  </div>
                ) : devOtp ? (
                  <div
                    className="p-2 mb-3 rounded-2 d-flex align-items-center justify-content-between"
                    style={{ backgroundColor: "#eef5fc", border: "1px dashed #387ed1" }}
                  >
                    <span className="small text-dark">
                      <i className="fa-solid fa-key me-1 text-primary"></i>
                      Demo OTP: <strong className="text-primary">{devOtp}</strong>
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm py-0 px-2 fw-semibold text-white"
                      style={{ backgroundColor: "#387ed1", fontSize: "12px" }}
                      onClick={handleAutoFillDevOtp}
                    >
                      Auto-fill
                    </button>
                  </div>
                ) : null}

                {/* 6 Individual Numeric Boxes */}
                <form onSubmit={handleVerifyOtp}>
                  <div
                    className="d-flex justify-content-between gap-2 mb-4"
                    onPaste={handlePaste}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        className="form-control text-center fw-bold p-0"
                        style={{
                          width: "48px",
                          height: "52px",
                          fontSize: "22px",
                          borderColor: digit ? "#387ed1" : "#ced4da",
                          backgroundColor: digit ? "#f8fbfe" : "#fff",
                        }}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2.5 fw-medium text-white shadow-sm mb-3"
                    disabled={loading || otp.join("").length !== 6}
                    style={{ backgroundColor: "#387ed1", fontSize: "15px" }}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      mode === "signup" ? "Verify & Open Demat Account" : "Verify & Continue"
                    )}
                  </button>
                </form>

                {/* Resend Timer / Action */}
                <div className="text-center small text-muted">
                  {resendTimer > 0 ? (
                    <span>Resend code in <strong>{resendTimer}s</strong></span>
                  ) : (
                    <button
                      className="btn btn-link btn-sm text-decoration-none p-0 fw-semibold"
                      style={{ color: "#387ed1" }}
                      onClick={handleSubmitDetails}
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STAGE 3: ACCOUNT PROVISIONED & DEMAT SUMMARY CARD */}
            {step === 3 && userProfile && (
              <div>
                <div className="text-center mb-3">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                      fontSize: "26px",
                    }}
                  >
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h3 className="fw-bold fs-4 text-dark mb-1">
                    Welcome, {userProfile.fullName || "Trader"}!
                  </h3>
                  <p className="text-muted small mb-0">
                    Your Zerodha Demat &amp; Trading Account is fully active.
                  </p>
                </div>

                {/* Demat Certificate Card */}
                <div
                  className="p-3 mb-4 rounded-3 border bg-light text-start"
                  style={{ fontSize: "13px" }}
                >
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="text-muted">Kite Client ID:</span>
                    <strong className="text-dark">{userProfile.userId}</strong>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span className="text-muted">Registered Email:</span>
                    <span className="text-dark fw-medium">{userProfile.email}</span>
                  </div>
                  {userProfile.pan && (
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">PAN Card:</span>
                      <span className="text-dark fw-semibold">{userProfile.pan}</span>
                    </div>
                  )}
                  {userProfile.demat && (
                    <div className="d-flex justify-content-between py-1 border-bottom">
                      <span className="text-muted">Demat (BO) ID:</span>
                      <span className="text-dark font-monospace">{userProfile.demat}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between py-1">
                    <span className="text-muted">Trading Segments:</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                      NSE / BSE Active
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <a
                    href={buildKiteLaunchUrl(userProfile)}
                    className="btn py-2.5 text-white fw-medium shadow-sm d-flex align-items-center justify-content-center gap-2"
                    style={{ backgroundColor: "#387ed1", fontSize: "15px" }}
                  >
                    <span>Launch Kite Dashboard</span>
                    <i className="fa-solid fa-arrow-up-right-from-square small"></i>
                  </a>

                  <Link
                    to="/"
                    className="btn btn-outline-secondary py-2 small fw-medium mt-1"
                  >
                    Back to Landing Page
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-danger small text-decoration-none mt-2"
                  >
                    Sign out from this account
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default SignUp;
