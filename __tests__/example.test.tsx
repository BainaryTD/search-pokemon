import { render, screen } from "@testing-library/react";
// ใช้สำหรับทดสอบ jest
test("Jest setup works correctly", () => {
  render(<div>Hello Test</div>);
  expect(screen.getByText("Hello Test")).toBeInTheDocument();
});