import React, { useState, useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar(props) {
  const history = useHistory();
  const [user, setUser] = useState();
  const handleUser = () => {
    setUser(props.user);
  };
  useEffect(() => {
    handleUser();
  }, [user]);

  return (
    <nav>
      <h2>Hello {user}</h2>

      <GoogleLogout
        clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={() => history.push("login")}
      />
    </nav>
  );
}

export default NavBar;
