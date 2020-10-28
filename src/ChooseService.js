import React, { useState } from "react";
import PickDateAndTime from "./PickDateAndTime";

function ChooseService() {
  const [selectedOption, setSelectedOption] = useState("Walk");

  const handleOption = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="choose-service">
      <h2>What Service are you interested in?</h2>
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

      <PickDateAndTime service={selectedOption} />
    </div>
  );
}

export default ChooseService;
