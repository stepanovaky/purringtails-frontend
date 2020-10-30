import React, { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

function NavBar(props) {
  const history = useHistory();
  const [user, setUser] = useState();
  const handleUser = () => {
    setUser(props.user);
  };
  useEffect(() => {
    handleUser();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <nav>
      <h2>Hello {user}</h2>
      <ErrorBoundary>
        <GoogleLogout
          clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => history.push("login")}
          onClick={handleLogout}
        />
      </ErrorBoundary>
    </nav>
  );
}

export default NavBar;
