import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FaUserAlt, FaLock } from "react-icons/fa";
import Cookies from "js-cookie";

import apiInitialOptions from "../../constants/api-initial-options";

import "./index.css";

const Login = () => {
  const [showError, setShowError] = useState(false);
  let navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();
    const data = fetchedData["get_user_id"];

    if (data.length === 0) {
      setShowError(true);
    } else {
      const userId = data[0]["id"];
      Cookies.set("user_id", userId);
      setShowError(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="loginContainer">
      <form className="card" onSubmit={onLoginHandler}>
        <img
          alt="nxt-watch-logo"
          src="https://res.cloudinary.com/dadmzulfj/image/upload/v1690639574/Logo_puyygq.png"
          className="login-logo-img"
        />
        <label htmlFor="email" className="label">
          <FaUserAlt className="login-icon" />
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email ID"
          ref={emailRef}
          className="input-cell"
        />
        <label htmlFor="password" className="label">
          <FaLock className="login-icon" />
          Password
        </label>
        <input
          className="input-cell"
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        {showError && (
          <p className="error">*User Credentials Incorrect</p>
        )}

        {/* BUTTON: Login */}
        <button type="submit" className="login-btn" >LOGIN</button>
      </form>
    </div>
  );
};

export default Login;