import React, { useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [fetchResponse, setFetchResponse] = useState();
  const redirectOnLogin = (response) => {
    authenticateLoginGoogle();
    setFetchResponse(response);
    console.log(response);
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
      if (fetchAuthResponse.status === 200) {
        history.push("/homepage", { fetchResponse });
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    const loginEmail = event.target["login_email"].value;
    const loginPassword = event.target["login_password"].value;
    const authToken = window.btoa(`${loginEmail}:${loginPassword}`);
    console.log(authToken);

    //send authtoken to server, turn that into jwt, return jwt to client,
    //then make sure all other requests have jwt attached
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
