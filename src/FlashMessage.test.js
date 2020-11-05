import React from "react";
import FlashMessage from "./FlashMessage";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<FlashMessage />);
});
