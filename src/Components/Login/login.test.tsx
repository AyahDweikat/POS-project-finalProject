import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import * as router from "react-router";
import Login from "./Login";
import * as fetchFunctions from "../../Utils/fetchApi.ts";

describe("Login Page", () => {
  const navigate = vi.fn();
  beforeEach(() => {
    vi.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("Login Title", () => {
    render(<Login />);
    const LoginTitle = screen.getByText(/Login Page/i);
    expect(LoginTitle).toBeInTheDocument();
  });
  test("when empty form, login button disabled", async () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /Login/i });
    expect(loginButton).toBeDisabled();
  });
  test("login successfully", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getByLabelText(/Password/);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    await fireEvent.change(emailInput, { target: { value: "ayah@gmail.com" } });
    await fireEvent.change(passwordInput, { target: { value: "ayah123" } });
    expect(loginButton).toBeEnabled();
    await fireEvent.click(loginButton);
    const fetchApi = vi.fn()
    vi.spyOn(fetchFunctions, "fetchApi").mockImplementation(() => fetchApi());
    waitFor(() => {
      expect(navigate).toBeCalled();
      expect(fetchApi).toBeCalled();
      const cartPage = screen.getByText(/cart/i);
      expect(cartPage).toBeInTheDocument();
    });
  });
});
