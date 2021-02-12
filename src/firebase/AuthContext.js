import React, { useContext, useEffect } from "react";
import { auth } from "../firebase/config";

const AuthContext = React.createContext();

// Access to our created context through this useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // create a current user state to be passed to the Logged in user context
  // const [currentUser, setCurrentUser] = useState();
  // const [loading, setLoading] = useState(true);

  //  *** MODULAR *** can wire up to other servers here  //
  /*
        const signup = (email, password) => {
          // returns a promise, to sign in if successful or throw an error if not
          return auth.createUserWithEmailAndPassword(email, password);
        };
    */

  /*
      const login = (email, password) => {
        // firebase method -
      auth.signInWithEmailAndPassword(email, password);
     };
    */

  /*
      const logout = (email, password) => {
        // firebase method -
        return auth.signOut();
      };
    */

  const resetPassword = (email) => {
    // firebase method -
    return auth.sendPasswordResetEmail(email);
  };

  /*
  const updateEmail = (email) => {
    // firebase method -
    return currentUser.updateEmail(email);
  };
  */

  /*
  const updatePassword = (password) => {
    // firebase method -
    return currentUser.updatePassword(password);
  };
  */

  // *** END OF MODULAR SERVER SECTION *** //

  // when signup is called, fires createUserWithEmailAndPassword, fires auth.onAuthStateChanged, then sets the current user state to the user who just logged in.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // setCurrentUser(user);
      // setLoading(false);
    });
    // Cleanup:
    return unsubscribe;
  }, []);

  // The value to pass to provider: the current signed in user, and signup function.
  const value = {
    resetPassword,
    /*
    currentUser,
    signup,
    login,
    logout,
    updateEmail,
    updatePassword,
    */
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
