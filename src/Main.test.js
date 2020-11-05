import React from "react";
import ReactDom from "react-dom";
import Main from "./Main";
import { shallow } from "enzyme";

// it("renders without crashing", () => {
//   shallow(<Main />);
// });

it("accepts props", () => {
  const props = {
    location: { state: { fetchResponse: { name: "Kaboo", id: "1234455" } } },
  };
  shallow(<Main {...props} />);
});
