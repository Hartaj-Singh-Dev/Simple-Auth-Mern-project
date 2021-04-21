import React, { useState , useContext } from "react";
import "../Styles/Login.css";
import login from "../SVG/undraw_login.svg";
import {userContext} from '../App'

import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const {state,dispatch} = useContext(userContext)
  const history = useHistory();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const LogInUser = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      mode: "cors",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Origin: "http://localhost:3000/",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.status == 400 ) {
      window.alert("Invalid credentials");
    } else {
      dispatch({type:"USER", payload:true})
      window.alert("Login Succesfull");
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <section className="login">
        <div className="container mt-5">
          <div className="Login-content">
            <div className="Login-image">
              <figure>
                <img src={login} alt="" />
              </figure>
              <NavLink to="/signin" className="signup-image-link">
                Not Have account?
              </NavLink>
            </div>
            <div className="login-form">
              <h2 className="form=title">LogIn</h2>
              <form className="register-form" method="POST">
                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email  material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    autoComplete="off"
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Password">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="text"
                    name="Password"
                    id="Password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    autoComplete="off"
                    placeholder="Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    onClick={LogInUser}
                    className="form-submit"
                    value="LogIn"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
