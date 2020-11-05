import React from "react";
import Registration from "./Registration";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Registration />);
});
