import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import NavBar from "./NavBar";
import ScheduledServices from "./ScheduledServices";

function Main(props) {
  const userGivenName = props.location.state.fetchResponse.name;
  const userId = props.location.state.fetchResponse.id;
  // console.log(props);

  return (
    <div className="App">
      <ErrorBoundary>
        <NavBar user={userGivenName} />
        <ScheduledServices userId={userId} userName={userGivenName} />
      </ErrorBoundary>
    </div>
  );
}

export default Main;
