// Higher Order component that will check for a user session and redirect accordingly

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Get user
  const { user } = useSession();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Will get the props from the url params
        const id = props.match.params.id;
        if (!!user && user.uid == id) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
