import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// ---- Size select element ----
test("size select element initially displays 'Small'", () => {
  render(<App />);

  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", async () => {
  render(<App />);

  const selectSize = screen.getByLabelText(/select size/i);
  const user = userEvent.setup();

  await user.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");

  await user.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

// ---- "Your Selection" message ----
test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("selecting options updates the 'Your selection' message", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const selectSize = screen.getByLabelText(/select size/i);
  const user = userEvent.setup();

  await user.click(addPepperoni);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();

  await user.selectOptions(selectSize, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

// ---- "Contact Info" text box ----
test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test("the page shows information the user types into the contact form field", async () => {
  render(<App />);
  const contact = screen.getByLabelText(/enter your email address/i);
  const user = userEvent.setup();

  await user.type(contact, "pizzafan@email.com");
  expect(contact).toHaveValue("pizzafan@email.com");
});

// ---- Submit Order button ----
test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /submit order/i })).toBeInTheDocument();
});

test("clicking the Submit Order button displays a thank you message", async () => {
  render(<App />);
  const user = userEvent.setup();
  const button = screen.getByRole("button", { name: /submit order/i });

  await user.click(button);
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
