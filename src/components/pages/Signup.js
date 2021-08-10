import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService.js";

const profile = require("../../assets/profile.png");

const Signup = () => {
  const dispatch = useDispatch()
  let history = useHistory();
  const [repassword, setRepassword] = useState("1234");
  const [user, setUser] = useState({
    id: 0,
    image:
      "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
    fname: "Roni",
    lname: "Bonim",
    phone: "050 9998376",
    address: {
      city: "Tel Aviv",
      street: "Rotchild",
      number: "22",
    },
    company: " Technology",
    roll: "",
    start_date: Date.now(),
    password: "1234",
    email: "shay2@gmail.com",
  });

  const { fname, lname, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await UserService.signup(user);
      dispatch({ type: "SET_USER", payload: data });
      history.push("/");
    } catch (error) {
      alert(error.response.data)
    }
  };

  return (
    <div className="signup-page container">
      <div>
        <h1>Sign up</h1>

        <div className="form-box">
          <img src={profile} alt="profile" />
          <form onSubmit={(e) => onSubmit(e)}>
            <h6>Personal Details</h6>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                value={fname}
                name="fname"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="lname"
                value={lname}
                name="lname"
                onChange={(e) => onInputChange(e)}
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                name="email"
                onChange={(e) => onInputChange(e)}
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>

            <h6 id="password">Password</h6>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                name="password"
                onChange={(e) => onInputChange(e)}
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="repassword"
                value={repassword}
                name="repassword"
                onChange={(e) => setRepassword(e.target.value)}
                placeholder="Retype Password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>

        <div className="signin-link">
          <p>Have an account?</p>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>

      <div className="terms">
        <Link to="/signin">Our Terms of Use and Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Signup;
