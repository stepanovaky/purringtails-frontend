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
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Walk"
              checked={selectedOption === "Walk"}
              onChange={() => handleOption("Walk")}
            />
            Walk
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Boarding"
              checked={selectedOption === "Boarding"}
              onChange={() => handleOption("Boarding")}
            />
            Boarding
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Drop In"
              checked={selectedOption === "Drop In"}
              onChange={() => handleOption("Drop In")}
            />
            Drop In
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="Sitting"
              checked={selectedOption === "Sitting"}
              onChange={() => handleOption("Sitting")}
            />
            Sitting
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
