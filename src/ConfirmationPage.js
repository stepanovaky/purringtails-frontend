import React, { useEffect } from "react";
import NavBar from "./NavBar";
import ErrorBoundary from "./ErrorBoundary";

function ConfirmationPage(props) {
  useEffect(() => {
    fetchScheduledInfo();
  });

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
      const postInfo = await fetch("http://localhost:8000/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newSchedule),
      });
      console.log(await postInfo);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(props);
  console.log(props.location.state.scheduledInfo.userId);
  console.log(props.location.state.scheduledInfo.service);
  console.log(props.location.state.scheduledInfo.startDate);
  console.log(props.location.state.scheduledInfo.endDate);
  console.log(props.location.state.scheduledInfo.daysOfService);
  // send a fetch response to server to log all of that into the server
  //send a confirmation email (optional at the moment)

  return (
    <div className="confirmation">
      <ErrorBoundary>
        <NavBar user={props.location.state.scheduledInfo.userName} />
      </ErrorBoundary>
    </div>
  );
}

export default ConfirmationPage;
