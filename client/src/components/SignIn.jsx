import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../Styles/SignIn.css";
import SignPic from "../SVG/undraw_Sign_in.svg";

const SignIn = () => {
  const history = useHistory();
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name;
  let data;

  const handleInput = (event) => {
    data = event.target.value;
    name = event.target.name;
    setuserdata({ ...userdata, [name]: data });
  };
  const RegUser = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, cpassword } = userdata;
    const data = {
      name: name,
      email: email,
      phone: parseInt(phone),
      password: password,
      cpassword: cpassword,
    };

    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    console.log(resp);
    if (!resp || resp.status === 404) {
      window.alert("Invalid Registartion");
      console.log("Invalid error ocuur");
    } else {
      window.alert("Succuesfull Registartion");
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <section className="login">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form=title">SignIn</h2>
              <form className="register-form" method="POST">
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account-circle material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={userdata.name}
                    onChange={handleInput}
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email  material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={userdata.email}
                    onChange={handleInput}
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Phone">
                    <i class="zmdi zmdi-phone-in-talk "></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    value={userdata.phone}
                    onChange={handleInput}
                    placeholder="Your Phone Number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Password">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={userdata.password}
                    onChange={handleInput}
                    placeholder="Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cPassword">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="text"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    value={userdata.cpassword}
                    onChange={handleInput}
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Register"
                    onClick={RegUser}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={SignPic} alt=""/>
    
              </figure>
              <NavLink to="/login" className="signup-image-link">
                Alerady registerd?
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignIn;
