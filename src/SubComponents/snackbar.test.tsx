import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach } from "vitest";
import SnackbarComponent from "./Snackbar";
// const token =
//   "black__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTBhOGI3OTBlZmUxYzAzOWUwZmIzNiIsImlhdCI6MTY4NzI1NzU5NywiZXhwIjoxNjg3MzQzOTk3fQ.Oiem-z2e6MJAfBlMCYHKmzQqE6pT_2dsDFIxgFqOx60";

describe("Categories Page", () => {
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