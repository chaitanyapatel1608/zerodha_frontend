import React, { useState, useRef, useEffect, useMemo } from "react";
import "./KiteDatePicker.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/**
 * Professional Kite-Themed Date of Birth Picker
 * Designed for Demat Account Opening & SEBI 18+ KYC Compliance
 */
const KiteDatePicker = ({
  name = "dob",
  value = "", // Format: "YYYY-MM-DD"
  onChange,
  isInvalid = false,
  minDate = "1930-01-01",
  maxDate = new Date().toISOString().split("T")[0],
  placeholder = "YYYY-MM-DD (e.g. 1995-08-15)",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedValue, setTypedValue] = useState(value || "");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync internal state when external value changes
  useEffect(() => {
    setTypedValue(value || "");
  }, [value]);

  // Parse ISO date "YYYY-MM-DD" safely
  const parsedDate = useMemo(() => {
    const str = value || typedValue;
    if (!str) return null;
    const parts = str.split("-");
    if (parts.length === 3) {
      let y = parseInt(parts[0], 10);
      let m = parseInt(parts[1], 10) - 1;
      let d = parseInt(parts[2], 10);
      // Handle reverse DD-MM-YYYY format if typed
      if (parts[0].length <= 2 && parts[2].length === 4) {
        d = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10) - 1;
        y = parseInt(parts[2], 10);
      }
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m, d);
      }
    }
    return null;
  }, [value, typedValue]);

  // Current year & reference defaults for adult DOB (~22 years ago)
  const today = useMemo(() => new Date(), []);
  const defaultBirthYear = today.getFullYear() - 22;

  // Active viewing year & month
  const [viewYear, setViewYear] = useState(() => {
    if (parsedDate) return parsedDate.getFullYear();
    return defaultBirthYear;
  });

  const [viewMonth, setViewMonth] = useState(() => {
    if (parsedDate) return parsedDate.getMonth();
    return 0; // January
  });

  // Keep calendar view synchronized with parsed date
  useEffect(() => {
    if (parsedDate) {
      setViewYear(parsedDate.getFullYear());
      setViewMonth(parsedDate.getMonth());
    }
  }, [parsedDate]);

  // Close calendar on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Calculate live age from selected date
  const calculatedAge = useMemo(() => {
    if (!parsedDate) return null;
    let age = today.getFullYear() - parsedDate.getFullYear();
    const m = today.getMonth() - parsedDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
      age--;
    }
    return age;
  }, [parsedDate, today]);

  // Year options: from minDate year to maxDate year
  const yearOptions = useMemo(() => {
    const minY = parseInt(minDate.split("-")[0], 10) || 1930;
    const maxY = parseInt(maxDate.split("-")[0], 10) || today.getFullYear();
    const years = [];
    for (let y = maxY; y >= minY; y--) {
      years.push(y);
    }
    return years;
  }, [minDate, maxDate, today]);

  // Calendar days grid computation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        month: viewMonth - 1,
        year: viewMonth === 0 ? viewYear - 1 : viewYear,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        day: i,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill a complete grid
    const remaining = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        month: viewMonth + 1,
        year: viewMonth === 11 ? viewYear + 1 : viewYear,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [viewYear, viewMonth]);

  // Month navigation
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Quick Age Jump handler
  const handleQuickAgeJump = (targetAge) => {
    const targetY = today.getFullYear() - targetAge;
    setViewYear(targetY);
    setViewMonth(0);
  };

  // Date selection via calendar click
  const handleSelectDate = (item) => {
    const m = String(item.month + 1).padStart(2, "0");
    const d = String(item.day).padStart(2, "0");
    const isoString = `${item.year}-${m}-${d}`;

    if (maxDate && isoString > maxDate) return;
    if (minDate && isoString < minDate) return;

    setTypedValue(isoString);
    if (onChange) {
      onChange({
        target: {
          name,
          value: isoString,
        },
      });
    }
    setIsOpen(false);
  };

  // Direct keyboard input change
  const handleDirectInputChange = (e) => {
    const raw = e.target.value;
    setTypedValue(raw);
    if (onChange) {
      onChange(e);
    }
  };

  // Clear button handler
  const handleClear = (e) => {
    e.stopPropagation();
    setTypedValue("");
    if (onChange) {
      onChange({
        target: {
          name,
          value: "",
        },
      });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`kite-datepicker-container ${disabled ? "disabled" : ""}`} ref={containerRef}>
      {/* Trigger & Input Bar */}
      <div
        className={`kite-datepicker-input ${isOpen ? "is-focused" : ""} ${isInvalid ? "is-invalid" : ""}`}
        onClick={() => {
          if (!disabled && !isOpen) setIsOpen(true);
        }}
      >
        <div className="kite-datepicker-left">
          <i
            className="fa-regular fa-calendar-days text-primary kite-dp-icon"
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) setIsOpen((prev) => !prev);
            }}
            title="Toggle Calendar"
            aria-label="Toggle Calendar"
          ></i>
          <input
            ref={inputRef}
            type="text"
            name={name}
            value={typedValue}
            placeholder={placeholder}
            className="kite-dp-native-input"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(true)}
            onChange={handleDirectInputChange}
            autoComplete="bday"
            aria-label="Date of Birth"
          />
        </div>

        <div className="kite-datepicker-right">
          {calculatedAge !== null && !isNaN(calculatedAge) && (
            <span
              className={`kite-age-badge ${calculatedAge >= 18 ? "badge-adult" : "badge-minor"}`}
              title={`Calculated Age: ${calculatedAge} years (${calculatedAge >= 18 ? "SEBI 18+ OK" : "Minor"})`}
            >
              {calculatedAge} yrs
            </span>
          )}

          {typedValue ? (
            <button
              type="button"
              className="kite-dp-clear-btn"
              onClick={handleClear}
              title="Clear date"
              aria-label="Clear date"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          ) : (
            <button
              type="button"
              className="kite-dp-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) setIsOpen((prev) => !prev);
              }}
              aria-label="Open Calendar"
            >
              <i className={`fa-solid fa-chevron-down kite-dp-arrow ${isOpen ? "open" : ""}`}></i>
            </button>
          )}
        </div>
      </div>

      {/* Popover Calendar Dropdown */}
      {isOpen && (
        <div className="kite-calendar-popover" role="dialog" aria-label="Select Date of Birth">
          {/* Quick Year Jump Bar for DOB */}
          <div className="kite-quick-jump-row">
            <span className="quick-jump-label">Quick Age Jump:</span>
            <div className="quick-jump-pills">
              <button
                type="button"
                className={`quick-pill ${today.getFullYear() - viewYear === 18 ? "active" : ""}`}
                onClick={() => handleQuickAgeJump(18)}
              >
                18 yrs
              </button>
              <button
                type="button"
                className={`quick-pill ${today.getFullYear() - viewYear === 22 ? "active" : ""}`}
                onClick={() => handleQuickAgeJump(22)}
              >
                22 yrs
              </button>
              <button
                type="button"
                className={`quick-pill ${today.getFullYear() - viewYear === 25 ? "active" : ""}`}
                onClick={() => handleQuickAgeJump(25)}
              >
                25 yrs
              </button>
              <button
                type="button"
                className={`quick-pill ${today.getFullYear() - viewYear === 30 ? "active" : ""}`}
                onClick={() => handleQuickAgeJump(30)}
              >
                30 yrs
              </button>
              <button
                type="button"
                className={`quick-pill ${today.getFullYear() - viewYear === 40 ? "active" : ""}`}
                onClick={() => handleQuickAgeJump(40)}
              >
                40 yrs
              </button>
            </div>
          </div>

          {/* Header Month / Year Selectors */}
          <div className="kite-calendar-header">
            <button
              type="button"
              className="kite-nav-btn"
              onClick={handlePrevMonth}
              title="Previous Month"
              aria-label="Previous Month"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="kite-select-group">
              <select
                className="kite-header-select month-select"
                value={viewMonth}
                onChange={(e) => setViewMonth(parseInt(e.target.value, 10))}
                aria-label="Select Month"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={idx} value={idx}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                className="kite-header-select year-select"
                value={viewYear}
                onChange={(e) => setViewYear(parseInt(e.target.value, 10))}
                aria-label="Select Year"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="kite-nav-btn"
              onClick={handleNextMonth}
              title="Next Month"
              aria-label="Next Month"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          {/* Weekday Row */}
          <div className="kite-weekdays-grid">
            {DAYS_OF_WEEK.map((day, idx) => (
              <span key={idx} className="kite-weekday-label">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="kite-days-grid">
            {calendarDays.map((item, idx) => {
              const m = String(item.month + 1).padStart(2, "0");
              const d = String(item.day).padStart(2, "0");
              const iso = `${item.year}-${m}-${d}`;

              const isSelected = (value || typedValue) === iso;
              const isFuture = maxDate && iso > maxDate;
              const isTooOld = minDate && iso < minDate;
              const isDisabled = isFuture || isTooOld;

              let cellClass = "kite-day-cell";
              if (!item.isCurrentMonth) cellClass += " outside-month";
              if (isSelected) cellClass += " is-selected";
              if (isDisabled) cellClass += " is-disabled";

              return (
                <button
                  key={idx}
                  type="button"
                  className={cellClass}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(item)}
                >
                  {item.day}
                </button>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="kite-calendar-footer">
            <div className="kite-footer-status">
              {calculatedAge !== null && !isNaN(calculatedAge) ? (
                <span className={`footer-age-text ${calculatedAge >= 18 ? "text-success" : "text-warning"}`}>
                  <i className={`fa-solid ${calculatedAge >= 18 ? "fa-circle-check" : "fa-triangle-exclamation"} me-1`}></i>
                  Age: <strong>{calculatedAge} yrs</strong> {calculatedAge >= 18 ? "(SEBI 18+ OK)" : "(Must be 18+)"}
                </span>
              ) : (
                <span className="footer-tip text-muted">
                  <i className="fa-solid fa-info-circle me-1"></i>Select or type your birth date
                </span>
              )}
            </div>

            <div className="kite-footer-actions">
              {typedValue && (
                <button
                  type="button"
                  className="kite-footer-btn clear"
                  onClick={handleClear}
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                className="kite-footer-btn close"
                onClick={() => setIsOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KiteDatePicker;
