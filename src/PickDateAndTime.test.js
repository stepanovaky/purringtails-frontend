import React from "react";
import PickDateAndTime from "./PickDateAndTime";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PickDateAndTime />);
});
