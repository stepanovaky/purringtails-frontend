import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Flash from "./FlashMessage";
import "./Login.css";
import Picture from "./images/Purring-Tails-Banner.png";

function Login() {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const loginEmail = event.target["login-email"].value.toLowerCase();
    const loginPassword = event.target["login-password"].value;
    const authToken = window.btoa(`${loginEmail}:${loginPassword}`);
    try {
      const fetchUser = await fetch(
        `${process.env.REACT_APP_API}/api/user/email/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/ json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const response = fetchUser;

      if (response.status === 200) {
        const fetchResponse = await response.json();
        console.log(fetchResponse);
        const sessionStorage = window.sessionStorage;
        sessionStorage.setItem("authToken", fetchResponse.authToken);
        sessionStorage.setItem("state", true);

        history.push("/homepage", { fetchResponse });
      } else if (response.status === 400) {
        const error = await response.json();
        setShowMessage(true);
        setErrorMessage(error.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <img src={Picture} alt="Purring Tails banner" />
      <p className="scale-up-center">
        Welcome to PurringTails! Login to schedule one of the pet sitting
        services we provide for your pet!
      </p>
      <form className="email-login" onSubmit={handleEmailSubmit}>
        <h2>Email Sign In</h2>
        <label htmlFor="login-email">
          {" "}
          Email: <br />
          <input type="email" required name="login-email" id="login-email" />
        </label>
        <label htmlFor="login-password">
          {" "}
          <br /> Password: <br />
          <input
            type="password"
            required
            name="login-passwrd"
            id="login-password"
          />
        </label>
        <br />
        <label htmlFor="submit-label-login">
          <input
            type="submit"
            value="submit"
            name="email-submit"
            id="email-submit"
          />
          <ErrorBoundary>
            {showMessage && (
              <div>
                <Flash message={errorMessage} />
              </div>
            )}
          </ErrorBoundary>
        </label>
      </form>
      <Link to="/registration">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;
