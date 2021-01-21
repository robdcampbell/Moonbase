// Will house the User context, Provider Context, and Also a Hook to access current userSession

import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app";

// Create userContext
export const UserContext = React.createContext();

// TopLevel App Component
export const UserProvider = (props) => {
  const [session, setSession] = useState({ user: null, loading: true });

  //Listen for firebase auth changes
  useEffect(() => {
    // Firebase: set to unsubscribed to remove eventListener when invoked
    const unsubscribed = firebase.auth().onAuthStateChanged((user) => {
      setSession({ loading: false, user });
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
