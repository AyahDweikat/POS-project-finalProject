import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import SnackbarComponent from "./Snackbar";

describe("Snackbar Component", () => {
  beforeEach(() => {
    render(<SnackbarComponent snackBarMsg="hello It's snackbar" />);
  });
  const snacknarText = screen.getByText(/hello It's snackbar/i);
  test("View Snacknar", () => {
    expect(snacknarText).toBeInTheDocument();
  });
  test("close Snacknar", () => {
    const closeBtn = screen.getByLabelText(/close/i);
    expect(closeBtn).not.toBeInTheDocument();
    expect(snacknarText).not.toBeInTheDocument();
  });
});