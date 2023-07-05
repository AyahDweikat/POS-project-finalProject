import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach } from "vitest";
import * as fetchingFunction from "../../Utils/fetchApi";
import Profile from "./Profile";


describe("Profile Page", () => {
  const fetchApiWithAuthNoBody = vi.fn();
  beforeEach(() => {
    vi.spyOn(fetchingFunction ,"fetchApiWithAuthNoBody" ).mockImplementation(() => fetchApiWithAuthNoBody());
    render(<Profile />);
  });
  test("UserName and Email data", () => {
    const userNameTitle = screen.getByText(/User Name:/i);
    expect(userNameTitle).toBeInTheDocument();
    const userEmailTitle = screen.getByText(/Email:/i);
    expect(userEmailTitle).toBeInTheDocument();
    const userNameData = document.getElementById('userName')
    expect(userNameData).toBeInTheDocument();
    const userEmailData = document.getElementById('email')
    expect(userEmailData).toBeInTheDocument();
  });
  test("Image", () => {
    const userImage = document.getElementById('userImage')
    expect(userImage).toBeInTheDocument();
    const inputforImage = document.getElementById('imageInput')
    expect(inputforImage).toBeInTheDocument();
  });
});