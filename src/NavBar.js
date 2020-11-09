import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
      <h2 className="jello-horizontal">
        <span className="first-letter">Hello</span>{" "}
        <span className="first-letter">{user}</span>
      </h2>
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
