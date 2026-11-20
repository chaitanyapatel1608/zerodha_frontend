import { describe, it, expect, vi, cleanup } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import KiteDatePicker from "../landing_page/common/KiteDatePicker";

describe("KiteDatePicker Component Suite", () => {
  it("renders with calendar icon and input placeholder", () => {
    render(<KiteDatePicker name="dob" placeholder="Select Date of Birth" />);
    const input = screen.getByPlaceholderText("Select Date of Birth");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "dob");
  });

  it("handles direct typing and triggers onChange", () => {
    const handleChange = vi.fn();
    render(<KiteDatePicker name="dob" value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox", { name: "Date of Birth" });
    fireEvent.change(input, { target: { value: "1995-08-15" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("opens popover calendar on click and selects a date", () => {
    const handleChange = vi.fn();
    render(<KiteDatePicker name="dob" value="2000-01-15" onChange={handleChange} />);
    
    // Check age badge
    expect(screen.getByText(/26 yrs/)).toBeInTheDocument();

    // Open calendar popover
    const toggleBtn = screen.getByLabelText("Toggle Calendar");
    fireEvent.click(toggleBtn);
    expect(screen.getByRole("dialog", { name: "Select Date of Birth" })).toBeInTheDocument();

    // Click a day cell
    const dayCells = screen.getAllByRole("button");
    const day10 = dayCells.find((btn) => btn.textContent === "10" && btn.classList.contains("kite-day-cell"));
    if (day10) {
      fireEvent.click(day10);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            name: "dob",
            value: expect.stringMatching(/^\d{4}-\d{2}-10$/),
          }),
        })
      );
    }
  });

  it("allows clearing selected date", () => {
    const handleChange = vi.fn();
    render(<KiteDatePicker name="dob" value="1998-05-20" onChange={handleChange} />);
    const clearBtn = screen.getByLabelText("Clear date");
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          name: "dob",
          value: "",
        }),
      })
    );
  });
});
