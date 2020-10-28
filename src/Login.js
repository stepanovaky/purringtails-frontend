import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Flash from "./FlashMessage";

function Login() {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [fetchResponse, setFetchResponse] = useState();

  const redirectOnLogin = (response) => {
    authenticateLoginGoogle();
    setFetchResponse(response);
  };

  const redirect = (response) => {
    if (response.status === 200) {
      const responseJSON = response.json();
      history.push("/homepage", { responseJSON });
    } else if (response.status === 400) {
      const error = response.json();
      console.log(error);
      setShowMessage(true);
      setErrorMessage(error.error);
    }
  };

  const authenticateLoginGoogle = async () => {
    try {
      const fetchAuthResponse = await fetch("http://localhost:8000/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${fetchResponse.tokenId}`,
        },
      });

      redirect(fetchAuthResponse);
    } catch {}
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const loginEmail = event.target["login_email"].value;
    const loginPassword = event.target["login_password"].value;
    const authToken = window.btoa(`${loginEmail}:${loginPassword}`);
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
    const response = await fetchUser;
    redirect(fetchUser);
  };

  return (
    <div className="google_login">
      <p>
        Welcome to PurringTails! Login to schedule one of the pet sitting
        services we provide for your pet!
      </p>
      <GoogleLogin
        clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
        onSuccess={redirectOnLogin}
        onFailure={(error) => console.log(error)}
        redirectUri="http://localhost:3000/homepage"
        isSignedIn={true}
      />
      <GoogleLogout
        clientId="1031900326041-m3tpi4kjudu1f5uqj3jjp0pufpqs0ah8.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={() => history.push("/login")}
      />
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
        {showMessage && (
          <div>
            <Flash message={errorMessage} />
          </div>
        )}
        <label htmlFor="submit_label_login">
          <input
            type="submit"
            value="submit"
            name="email_submit"
            id="email_submit"
          />
        </label>
      </form>
      <Link to="/registration">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;
