import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [error, setError] = useState();
  const history = useHistory();

  const redirectIfLoggedIn = () => {
    if (props.loggedIn === true) {
      history.push("/homepage");
    }
  };

  useEffect(() => {
    redirectIfLoggedIn();
  }, [props.loggedIn]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const User = {
      email: event.target["email"].value,
      password: event.target["password"].value,
    };

    const loginUser = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(User),
    });
    const userData = await loginUser.json();
    if (User.password === userData[0].user_password) {
      props.setLoggedIn(true);
      console.log(props.loggedIn);
      history.push("/homepage");
    } else {
      setError(<p>Incorrect Email</p>);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="/login" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          {error}
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
