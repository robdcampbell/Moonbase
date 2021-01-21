import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../firebase/auth";
import { Link } from "react-router-dom";

// Because this componenet is being passed as a Prop (in Route) - it has access
// to the *history prop* , and can be useful for re-routing/redirection
const Login = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    let user;
    setLoading(true);
    try {
      user = await login(data);
    } catch (e) {
      console.log(e);
    }
    if (user) {
      props.history.push(`/profile/${user.uid}`);
    } else {
      setLoading(false);
    }
  };

  const formClassName = `ui form ${isLoading ? "loading" : ""}`;

  return (
    <div className="login-container">
      <div className="ui card login-card">
        <div className="content">
          <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
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
              <button className="ui primary button login" type="submit">
                Log in
              </button>
              <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
