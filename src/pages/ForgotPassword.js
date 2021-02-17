import React, { useState, useRef } from "react";
import "firebase/auth";
import { useAuth } from "../firebase/AuthContext";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

// Because this componenet is being passed as a Prop (in Route) - it has access
// to the *history prop* , and can be useful for re-routing/redirection  - here for the Demo route.
const ForgotPassword = (props) => {
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  // const routeOnLogin = async (user) => {
  //   // Get token of the user to see if they're an Admin
  //   const token = await user.getIdTokenResult();
  //   if (token.claims.admin) {
  //     props.history.push("/users");
  //   } else {
  //     props.history.push(`/profile/${user.uid}`);
  //   }
  // };

  // const resetPassword = (email) => {
  //   setMessage("Check your email and return to login.");

  //   console.log("Pterodactyl");

  //   //firebase.auth.sendPasswordResetEmail()
  //   //firebase.auth.sendPasswordResetEmail()
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(emailRef.current.value);
      console.log(emailRef.current.value);
      setMessage("Check your email and return to login.");
    } catch (e) {
      setMessage("didn't work...");
    }
    //console.log(emailRef.current.value);
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    // const guestPass = process.env.REACT_APP_GUEST_PASSWORD;
    // console.log(guestPass);
    let user;
    // STORE THIS IN .ENV !!!! HARDCODED JUST FOR DEVELOPMENT
    user = login({
      email: "guestuser@email.com",
      password: "1234567",
    });
    props.history.push(`/profile/${user.uid}`);
  };

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <h1 style={{ textAlign: "center" }}>Forgot your Password?</h1>
          {message && (
            <div style={{ textAlign: "center" }}>
              <Link className="message__link" to="/login">
                Check your email and return to Log in
              </Link>
            </div>
          )}
          <form className="ui form" onSubmit={onSubmit}>
            {!message && (
              <>
                <div className="field">
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={emailRef}
                      required
                    />
                  </label>
                </div>

                <div className="field actions">
                  <button
                    className="demo-link"
                    onClick={loginGuest}
                    type="button"
                  >
                    Demo Login
                  </button>
                  <div>
                    <button
                      className="ui gradient__btn button login"
                      type="submit"
                      onSubmit={(e) => resetPassword()}
                    >
                      Reset by email
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="under__container">
        <p>Need an account?</p>
        <Link className="other-link" to="/signup">
          Sign up
        </Link>
        <p>or</p>
        <Link className="other-link" to="/login">
          Return to Log in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
