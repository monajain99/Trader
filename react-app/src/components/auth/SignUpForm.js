import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import "../../styles/SignUpForm.css";



const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [loaded, setLoaded] = useState("false")
  const [errors, setErrors] = useState([]);


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, full_name);
      if (!user.errors) {
        setAuthenticated(true);
        window.location.reload(false);
      } else {
        setErrors(user.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };
  

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/profile" loaded={loaded} />;
  }

  return (
    <div className="signup-form-div h-100vh pattern-cross-dots-xl flex justify-center items-center bg-fixed">
      <form onSubmit={onSignUp} className="signup-form animate__animated animate__bounceInUp">
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="input-wrapper">
          <h1 className="form-title">ProTrader</h1>
          <label>Username</label>
          <input
            type="text"
            className="input"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="input-wrapper">
          <label>Email</label>
          <input
            className="input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="input-wrapper">
          <label>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="input-wrapper">
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="input-wrapper">
          <label>Full Name</label>
          <input
            className="input"
            type="text"
            onChange={updateFullName}
            value={full_name}
            required={true}
          ></input>
        </div>
        <button className="signup-button" type="submit">
          Submit
				</button>
        <p className="cta-p">
          Have an account?{" "}
          <a className="cta-a" href="/login">
            Sign in
					</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
