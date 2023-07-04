import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Signup from "./Signup";
import * as router from "react-router";

describe("Signup Page", () => {
  const navigate = vi.fn();
  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("Register Title", () => {
    render(<Signup />);
    const registerTitle = screen.getByText(/Register/i);
    expect(registerTitle).toBeInTheDocument();
  });
  test("when empty form, signup button disabled", async () => {
    render(<Signup />);
    const addSubmit = screen.getByRole("button", { name: /Signup/i });
    expect(addSubmit).toBeDisabled();
  });
  test("signup successfully", async () => {
    render(<Signup />);
    const userNameInput = screen.getByLabelText(/User Name/);
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/);
    expect(userNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    const signupButton = screen.getByRole("button", { name: /Signup/i });
    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toBeDisabled();
    await fireEvent.change(userNameInput, { target: { value: "ayah" } });
    await fireEvent.change(emailInput, { target: { value: "ayah@gmail.com" } });
    if (passwordInput) {
      await fireEvent.change(passwordInput, { target: { value: "ayah123" } });
      await fireEvent.change(confirmPasswordInput, {
        target: { value: "ayah123" },
      });
      expect(signupButton).toBeEnabled();
      await fireEvent.click(signupButton);
      waitFor(() => {
        expect(navigate).toBeCalled();
        const loginpage = screen.getByText(/login/i);
        expect(loginpage).toBeInTheDocument();
      })
    }
  });
});
