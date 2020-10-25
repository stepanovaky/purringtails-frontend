import React from "react";
import Main from "./Main";
import { Route } from "react-router-dom";
import Login from "./Login";
import LoginAuth from "./LoginAuth";

function App() {
  return (
    <div className="App">
      <Route path="/homepage" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/loginauth" component={LoginAuth} />
    </div>
  );
}

export default App;
