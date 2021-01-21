import React from "react";
import Header from "./Header";
import "./App.css";
import "./firebase/config";
import "./pages/Signup";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import { UserProvider } from "./firebase/UserProvider";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header></Header>
        <div className="app">
          <div className="ui grid container">
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
