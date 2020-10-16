import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <h1>Register</h1>
      <form action="/login" method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
