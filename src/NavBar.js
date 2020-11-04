import React, { useState, useEffect } from "react";
// import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
// import ErrorBoundary from "./ErrorBoundary";
import "./NavBar.css";

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
    history.push("/login");
  };

  return (
    <nav>
      <h2>
        <span className="first-letter">Hello</span>{" "}
        <span className="first-letter">{user}</span>
      </h2>
      {/* <ErrorBoundary>
        <GoogleLogout
          clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => history.push("login")}
          onClick={handleLogout}
        />
      </ErrorBoundary> */}
      <input
        className="logout"
        type="button"
        value="Log Out"
        name="logout"
        onClick={handleLogout}
      />
    </nav>
  );
}

export default NavBar;
