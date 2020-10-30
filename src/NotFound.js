import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Oops, nothing here</h1>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}

export default NotFound;
