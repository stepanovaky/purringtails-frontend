import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      name: event.target["name"].value,
      email: event.target["email"].value,
      password: event.target["password"].value,
    };

    const addUser = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    history.push("/login");
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form action="/register" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Register;
