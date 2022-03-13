import { render, screen } from "@testing-library/react";
import { Hackernews } from "../Hackernews";

test("renders learn react link", () => {
  render(<Hackernews />);
  const linkElement = screen.getByText(/Hello World!/i);
  expect(linkElement).toBeInTheDocument();
});
