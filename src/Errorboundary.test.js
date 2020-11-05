import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<ErrorBoundary />);
});
