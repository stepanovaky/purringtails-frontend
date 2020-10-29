import React, { useEffect } from "react";
import ChooseService from "./ChooseService";
import ErrorBoundary from "./ErrorBoundary";
import NavBar from "./NavBar";
import ScheduledServices from "./ScheduledServices";

function Main(props) {
  const userGivenName = props.location.state.fetchResponse.name;
  const userId = props.location.state.fetchResponse.id;

  console.log(props);

  return (
    <div className="App">
      <ErrorBoundary>
        <NavBar user={userGivenName} />
        <ScheduledServices userId={userId} />
        <ChooseService userName={userGivenName} userId={userId} />
      </ErrorBoundary>
    </div>
  );
}

export default Main;
