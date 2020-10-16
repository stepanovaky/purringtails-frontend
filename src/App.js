import React from "react";
import Main from "./Main";
import { Route } from "react-router-dom";
import Login from "./LoginRegister/login";
import Register from "./LoginRegister/register";

function App() {
  return (
    <div className="App">
      <Route path="/homepage" component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  );
}

export default App;
