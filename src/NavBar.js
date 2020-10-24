import React from "react";

function NavBar(props) {
  // const handleChange = () => {

  // }
  return (
    <nav>
      <h2>Hello {props.user}</h2>
      <ul>
        <li>Homepage</li>
        <li>Schedule</li>
        <li>About</li>
        {/* <LogOut handleChange={props.handleChange()} /> */}
      </ul>
    </nav>
  );
}

export default NavBar;
