import React from "react";
import PrivateRoute from "./PrivateRoute";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<PrivateRoute />);
});
