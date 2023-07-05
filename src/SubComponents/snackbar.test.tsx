import { describe, test, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SnackbarComponent from "./Snackbar";

describe("Snackbar Component", () => {
  test("View Snacknar", () => {
    render(<SnackbarComponent snackBarMsg="hello" />);
    const snacknarText = screen.getByText(/hello/i);
    expect(snacknarText).toBeInTheDocument();
  });
  test("close Snacknar", () => {
    render(<SnackbarComponent snackBarMsg="hello" />);
    const snacknarText = screen.getByText(/hello/i);
    const closeBtn = screen.getByLabelText(/close/i);
    fireEvent.click(closeBtn);
    waitFor(() => {
      expect(closeBtn).not.toBeInTheDocument();
      expect(snacknarText).not.toBeInTheDocument();
    });
  });
});
