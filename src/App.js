import React, { useState, useEffect } from "react";
import Main from "./Main";
import { Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import ConfirmationPage from "./ConfirmationPage";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [user, setUser] = useState();

  const handleUser = (name) => {
    setUser(name);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <Route
          path="/homepage"
          render={(props) => <Main {...props} handleUser={handleUser} />}
        />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/confirmation" component={ConfirmationPage} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
