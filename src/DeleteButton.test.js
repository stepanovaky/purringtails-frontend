import React from "react";
import DeleteButton from "./DeleteButton";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<DeleteButton />);
});
