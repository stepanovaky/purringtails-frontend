import React, { useEffect } from "react";
import ChooseService from "./ChooseService";
import NavBar from "./NavBar";
import ScheduledServices from "./ScheduledServices";

function Main(props) {
  const userGivenName = props.location.state.fetchResponse.profileObj.givenName;
  const userEmail = props.location.state.fetchResponse.profileObj.email;
  //useremail stored ... in context? so that confirmation email can be sent later
  //in context, confirmation nested through chooseservice
  useEffect(() => {
    props.handleUser(userGivenName);
  });
  return (
    <div className="App">
      <NavBar user={userGivenName} />
      <ScheduledServices />
      <ChooseService />
    </div>
  );
}

export default Main;
