import React, { useEffect } from "react";

function ConfirmationPage(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchConfirmation();
  };

  console.log(props.service);
  console.log(props.startDate);
  console.log(props.endDate);
  console.log(props.daysOfService);
  // send a fetch response to server to log all of that into the server
  //send a confirmation email (optional at the moment)

  const fetchConfirmation = async () => {};
  return (
    <div className="confirmation" onSubmit={handleSubmit}>
      <form className="confirmation">
        <label htmlFor="confirmation">
          <input
            type="submit"
            id="confirmation"
            name="confirmation"
            value="Confirm"
          />
        </label>
      </form>
    </div>
  );
}

export default ConfirmationPage;
