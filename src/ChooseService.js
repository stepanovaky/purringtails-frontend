import React, { useState } from "react";
import PickDateAndTime from "./PickDateAndTime";
import ErrorBoundary from "./ErrorBoundary";
import "./ChooseService.css";

function ChooseService(props) {
  const [selectedOption, setSelectedOption] = useState("Walk");

  const handleOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="choose-service">
      <h3>Pick Service</h3>
      <form className="choose-service-form">
        <div className="radio control-group">
          <label className="control control-radio">
            <input
              type="radio"
              value="Walk"
              checked={selectedOption === "Walk"}
              onChange={() => handleOption("Walk")}
            />
            Walk
            <div class="control_indicator"></div>
          </label>
          <label className="control control-radio">
            <input
              type="radio"
              value="Boarding"
              checked={selectedOption === "Boarding"}
              onChange={() => handleOption("Boarding")}
            />
            Boarding
            <div class="control_indicator"></div>
          </label>
          <label className="control control-radio">
            <input
              type="radio"
              value="Drop In"
              checked={selectedOption === "Drop In"}
              onChange={() => handleOption("Drop In")}
            />
            Drop In
            <div class="control_indicator"></div>
          </label>
          <label className="control control-radio">
            <input
              type="radio"
              value="Sitting"
              checked={selectedOption === "Sitting"}
              onChange={() => handleOption("Sitting")}
            />
            Sitting
            <div class="control_indicator"></div>
          </label>
        </div>
      </form>
      <ErrorBoundary>
        <PickDateAndTime
          userName={props.userName}
          userId={props.userId}
          service={selectedOption}
        />
      </ErrorBoundary>
    </div>
  );
}

export default ChooseService;
