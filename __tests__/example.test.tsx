import { render, screen } from "@testing-library/react";

test("Jest setup works correctly", () => {
  render(<div>Hello Test</div>);
  expect(screen.getByText("Hello Test")).toBeInTheDocument();
});