import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import UserList from "./UserList";
import UserView from "./UserView";

const logout = () => {
  localStorage.removeItem("id");
};

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          DroneDrop
          <a href="/">Home</a>
          {localStorage.getItem("id") ? (
            <a onClick={logout} href="/">
              Log Out
            </a>
          ) : (
            <div />
          )}
        </nav>
        <main>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/users" component={UserList} />
          <Route path="/users/:id" component={UserView} />
        </main>
      </div>
    </Router>
  );
};

export default Routes;
