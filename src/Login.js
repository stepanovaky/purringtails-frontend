import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Flash from "./FlashMessage";

function Login() {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const redirectOnLogin = (response) => {
    authenticateLoginGoogle(response);
  };

  const authenticateLoginGoogle = async (response) => {
    try {
      const fetchAuthResponse = await fetch("http://localhost:8000/auth", {
        method: "GET",
        headers: {
          Authorization: `${response.tokenId}`,
          "Content-Type": "application/json",
        },
      });

      if (fetchAuthResponse.status === 200) {
        const fetchResponse = await fetchAuthResponse.json();
        const sessionStorage = window.sessionStorage;
        sessionStorage.setItem("authToken", fetchResponse.authToken);
        // const data = sessionStorage.getItem("authToken");
        // console.log(data);
        // console.log(fetchResponse);
        history.push("/homepage", { fetchResponse });
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const loginEmail = event.target["login_email"].value;
    const loginPassword = event.target["login_password"].value;
    const authToken = window.btoa(`${loginEmail}:${loginPassword}`);
    try {
      const fetchUser = await fetch(
        "http://localhost:8000/api/user/email/login",
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
        console.log(response);
        const fetchResponse = await response.json();
        const sessionStorage = window.sessionStorage;
        sessionStorage.setItem("authToken", fetchResponse.authToken);

        history.push("/homepage", { fetchResponse });
      } else if (response.status === 400) {
        const error = await response.json();
        console.log(error);
        setShowMessage(true);
        setErrorMessage(error.error);
      }
    } catch (error) {
      console.log(error);
    }
    //   //send authtoken to server, turn that into jwt, return jwt to client,
    //   //then make sure all other requests have jwt attached
  };

  return (
    <div className="google_login">
      <p>
        Welcome to PurringTails! Login to schedule one of the pet sitting
        services we provide for your pet!
      </p>
      <ErrorBoundary>
        <GoogleLogin
          clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
          onSuccess={redirectOnLogin}
          onFailure={(error) => console.log(error)}
          redirectUri="http://localhost:3000/homepage"
          isSignedIn={true}
        />
      </ErrorBoundary>

      <form className="email_login" onSubmit={handleEmailSubmit}>
        <h2>Email Sign In</h2>
        <label htmlFor="login_email">
          {" "}
          Email:
          <input type="email" required name="login_email" id="login_email" />
        </label>
        <label htmlFor="login_password">
          {" "}
          Password:
          <input
            type="password"
            required
            name="login_passwrd"
            id="login_password"
          />
        </label>
        <label htmlFor="submit_label_login">
          <input
            type="submit"
            value="submit"
            name="email_submit"
            id="email_submit"
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
