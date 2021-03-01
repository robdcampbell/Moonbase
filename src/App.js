import React from "react";
import Header from "./Header";
import "./App.css";
import "./firebase/config";
import "./pages/Signup";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Signup from "./pages/Signup";
import { AuthProvider } from "./firebase/AuthContext";
import { UserProvider } from "./firebase/UserProvider";
import { ProjectsProvider } from "./context/ProjectsContext";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import Users from "./pages/Users";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage.js/PostPage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectsProvider>
          <BrowserRouter>
            <Header></Header>
            <div className="app">
              <div className="ui grid container">
                <Switch>
                  <ProfileRedirect exact path="/signup" component={Signup} />
                  <PrivateRoute exact path="/profile/:id" component={Profile} />
                  <Route path="/post/:id" component={PostPage} />
                  <ProfileRedirect exact path="/login" component={Login} />
                  <ProfileRedirect
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  />
                  <AdminRoute exat path="/users" component={Users} />
                  <Route exact path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </ProjectsProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
