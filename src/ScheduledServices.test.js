import React from "react";
import ScheduledServices from "./ScheduledServices";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<ScheduledServices />);
});
