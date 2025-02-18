import React from "react";
import { render, fireEvent } from "@/tests/testUtils";
import Home from "@/pages/index";

describe("Home page", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Home lngDict={{}} lng="" />, {});
    expect(asFragment()).toMatchSnapshot();
  });

  it("clicking button triggers alert", () => {
    const { getByText } = render(<Home lngDict={{}} lng="" />, {});
    window.alert = jest.fn();
    fireEvent.click(getByText("Test Button"));
    expect(window.alert).toHaveBeenCalledWith("With typescript and Jest");
  });
});
