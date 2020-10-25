import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const redirectOnLogin = (response) => {
    history.push("/loginauth", { response });
    console.log(response);
  };
  return (
    <div className="login">
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
        onLogoutSuccess={() => history.push("login")}
      />
    </div>
  );
}

export default Login;
