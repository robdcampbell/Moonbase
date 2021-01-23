// Will house the User context, Provider Context, and Also a Hook to access current userSession

import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app";

// Create userContext
export const UserContext = React.createContext();

// TopLevel App Component
export const UserProvider = (props) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    idAdmin: false,
  });

  //Listen for firebase auth changes
  useEffect(() => {
    // Firebase: set to unsubscribed to remove eventListener when invoked
    const unsubscribed = firebase.auth().onAuthStateChanged(async (user) => {
      let isAdmin = false;

      if (user) {
        // Get Firebase Id Token to get Admin status of logged in User
        const token = await user.getIdTokenResult();
        // retreives Admin status from the Custom Claims we set (firebase/set-custom-claims)
        isAdmin = token.claims.admin;
      }

      setSession({ loading: false, user, isAdmin });
    });

    return () => unsubscribed();
  }, []);

  return (
    // value of the UserContext will contain the User-info State and LoadingState
    <UserContext.Provider value={session}>
      {!session.loading && props.children}
    </UserContext.Provider>
  );
};

// Custom hook to allow other Components to access the context
export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};

/* before changes to useEffect()
  useEffect(() => {
    // Firebase: set to unsubscribed to remove eventListener when invoked
    const unsubscribed = firebase.auth().onAuthStateChanged((user) => {
      setSession({ loading: false, user });
    });

    return () => unsubscribed();
  }, []);

*/
