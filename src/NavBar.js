import React from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

function NavBar(props) {
  const history = useHistory();
  return (
    <nav>
      <h2>Hello {props.userGivenName}</h2>
      <ul>
        <li>Schedule</li>
      </ul>
      <GoogleLogout
        clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={() => history.push("login")}
      />
    </nav>
  );
}

export default NavBar;
