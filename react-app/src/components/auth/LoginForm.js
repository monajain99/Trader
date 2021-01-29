import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "../../styles/LoginForm.css"

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      window.location.reload(false);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="login-form-div">
      <form
        onSubmit={onLogin}
        className="login-form"
      >
        <div>
          {errors.map((error) => (
            <div className="errors">
              <p>{error}</p>
            </div>
          ))}
        </div>
        <div className="input-wrapper">
          <h1 className="form-title">ProTrader</h1>
          <h3 className="form-sub">Login</h3>
          <input
            placeholder="Email"
            className="input"
            name="email"
            type="text"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="Password"

            className="input"
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type="submit" className="login-button">
          Submit
        </button>
        <p className="cta-p">
          Not a member?
          <a className="cta-a" href="/sign-up">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;



