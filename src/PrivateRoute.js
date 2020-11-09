import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = sessionStorage.getItem("state");
  //PrivateRoute checks whether someone is logged in (which is stored
  //in Session Storage) to determine if someone can visit a protected route
  //Important: Session Storage is wiped every time the browser is closed (added security)
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
