import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signup } from "../firebase/auth";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

// Because this componenet is being passed as a Prop (in Route) - it has access
// to the *history prop* , and can be useful for re-routing/redirection
function Signup(props) {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
    let newUser;
    setLoading(true);
    try {
      newUser = await signup(data);
    } catch (e) {
      console.log(e);
    }
    if (newUser) {
      props.history.push(`/profile/${newUser.uid}`);
    } else {
      setLoading(false);
    }
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    let user;
    // STORE THIS IN .ENV !!!! JUST FOR DEVELOPMENT
    user = login({ email: "guestuser@email.com", password: "1234567" });
    props.history.push(`/profile/${user.uid}`);
  };

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="two fields">
              <div className="field">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    ref={register}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    ref={register}
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={register}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                />
              </label>
            </div>
            <div className="field actions">
              <button type="button" className="other-link" onClick={loginGuest}>
                Demo Login
              </button>
              <div>
                <button className="ui primary button login" type="submit">
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="under__container">
        <p>Already have an account? </p>
        <Link className="other-link" to="/login">
          Log in here.
        </Link>
      </div>
    </div>
  );
}

export default Signup;
