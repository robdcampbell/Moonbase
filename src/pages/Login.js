import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const routeOnLogin = async (user) => {
    // Get token of the user to see if they're an Admin
    const token = await user.getIdTokenResult();
    if (token.claims.admin) {
      props.history.push("/users");
    } else {
      props.history.push(`/profile/${user.uid}`);
    }
  };

  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
    } catch (e) {
      console.log(e);
    }
    if (user) {
      routeOnLogin(user);
    } else {
      setLoading(false);
    }
  };

  const loginGuest = async (e) => {
    e.preventDefault();
    let user;
    // STORE THIS IN .ENV !!!! HARDCODED JUST FOR DEVELOPMENT
    user = login({
      email: "guestuser@email.com",
      password: "1234567",
    });
    props.history.push(`/profile/${user.uid}`);
  };

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="login-container">
      <div className="login__landing">
        <div className="login__left">
          {/* <h3>Welcome to</h3> */}
          <h1>moonbase.</h1>
          <p>Keeping track of those ongoing projects.</p>
        </div>
        <div className="login__right">
          <div className="account__card">
            <div className="content">
              <h1>Login</h1>
              <div className="image__container"></div>
              <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={register}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      className="ui button login gradient__btn"
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="account__cardBottom">
              <Link to="/forgot-password">
                Reset password via email{" "}
                <span className="reset__link">here.</span>
              </Link>
            </div>
          </div>
          <div className="under__container">
            <p>Need an account?</p>
            <Link className="other-link" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
