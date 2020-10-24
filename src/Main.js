import React, { useEffect } from "react";
import ChooseService from "./ChooseService";
import ConfirmationPage from "./ConfirmationPage";
import NavBar from "./NavBar";

function Main(props) {
  const response = props.response;

  useEffect(() => {
    authorizeLogin();
  });

  const authorizeLogin = async () => {
    console.log(response.accessToken);
    const sendLogin = await fetch(
      "https://cors-anywhere.herokuapp.com/http://localhost:8000/auth/google",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.accessToken}`,
        },
      }
    );
    const googleAPIResponse = await sendLogin.json();
    console.log(googleAPIResponse);
    console.log("this works");
  };
  return (
    <div className="App">
      <NavBar user={props.user} email={props.email} />
      <ChooseService />

      <ConfirmationPage />
    </div>
  );
}

export default Main;
