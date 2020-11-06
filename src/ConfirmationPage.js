import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ErrorBoundary from "./ErrorBoundary";
import { useHistory } from "react-router-dom";
import "./ConfirmationPage.css";

function ConfirmationPage(props) {
  const history = useHistory();
  useEffect(() => {
    fetchScheduledInfo();
  });

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const goBack = () => {
    history.goBack("/homepage");
  };

  const infoLocation = props.location.state.scheduledInfo;

  const fetchScheduledInfo = async () => {
    const authToken = sessionStorage.getItem("authToken");
    const newSchedule = {
      userId: infoLocation.userId,
      service: infoLocation.service,
      startDate: infoLocation.startDate,
      endDate: infoLocation.endDate == undefined ? "" : infoLocation.endDate,
    };
    try {
      const postInfo = await fetch(
        `${process.env.REACT_APP_API}/api/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(newSchedule),
        }
      );
      if (postInfo.status === 200) {
        setSuccessMessage(`You've successfully scheduled your service!`);
      } else if (postInfo.status === 400) {
        const error = await postInfo.json();
        console.log(error);
        setErrorMessage(error.error);
      }
    } catch (err) {}
  };

  return (
    <div className="history">
      <ErrorBoundary>
        <NavBar user={props.location.state.scheduledInfo.userName} />
      </ErrorBoundary>
      <h3 className="success">{successMessage}</h3>
      <h3 className="error">{errorMessage}</h3>
      <p>Go back to schedule another service or look at scheduled services</p>

      <input type="button" value="Go Back" onClick={goBack} />
    </div>
  );
}

export default ConfirmationPage;
