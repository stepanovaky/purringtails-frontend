import React, { useState, useEffect } from "react";
import Main from "./Main";
import { Route, useHistory } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";

function App() {
  const [response, setResponse] = useState();
  const history = useHistory();
  const redirectOnLogin = (response) => {
    history.push("/homepage");
    setResponse(response);
  };

  useEffect(() => {});

  return (
    <div className="App">
      <Route
        path="/homepage"
        render={(props) => <Main {...props} response={response} />}
      />
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
    //accessToken vs tokenId
  );
}

export default App;
