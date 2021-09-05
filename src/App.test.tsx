import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";
afterEach(cleanup);
test("renders with nab test code in the dom", () => {
	const headerText = "This is the NAB code challenge.";
	const { getByTestId } = render(<App />);
	const linkElement = screen.getByText(headerText);
	expect(linkElement).toBeInTheDocument();
	expect(getByTestId("ut-app-header")).toHaveTextContent(headerText);
});

test("snapshot", () => {
	const tree = renderer.create(<App />);
	expect(tree).toMatchSnapshot();
});
