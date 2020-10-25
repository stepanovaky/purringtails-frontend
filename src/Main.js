import React from "react";
import ChooseService from "./ChooseService";
import ConfirmationPage from "./ConfirmationPage";
import NavBar from "./NavBar";

function Main(props) {
  // console.log(props.location.state.response.profileObj.givenName);
  // console.log(props.location.state.response.accessToken);
  // const userGivenName = props.location.state.response.profileObj.givenName;
  // const userEmail = props.location.state.response.profileObj.email;

  return (
    <div className="App">
      {/* <NavBar userGivenName={userGivenName} /> */}
      <ChooseService />

      {/* <ConfirmationPage userEmail={userEmail} /> */}
    </div>
  );
}

export default Main;
