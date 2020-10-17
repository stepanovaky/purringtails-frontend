import React, { useState } from "react";
import Main from "./Main";
import { Route, Redirect } from "react-router-dom";
import Login from "./LoginRegister/login";
import Register from "./LoginRegister/register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Route path="/homepage" component={Main}>
        {loggedIn === false ? <Redirect to="/login" /> : <Main />}
      </Route>
      <Route
        path="/login"
        render={(props) => (
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )}
      ></Route>
      <Route path="/register" component={Register}>
        {loggedIn ? <Redirect to="/homepage" /> : <Register />}
      </Route>
    </div>
  );
}

export default App;
