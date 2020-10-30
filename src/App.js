import React, { useState, useEffect } from "react";
import Main from "./Main";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import ConfirmationPage from "./ConfirmationPage";
import ErrorBoundary from "./ErrorBoundary";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <PrivateRoute path="/homepage" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <PrivateRoute path="/confirmation" component={ConfirmationPage} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
