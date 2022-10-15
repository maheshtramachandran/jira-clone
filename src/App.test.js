import { render, screen } from "@testing-library/react";
import App from "./App";

let wrapper;
test("renders without crash", () => {
  render(<App />);
});
