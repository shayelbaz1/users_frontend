import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UserService from '../../services/UserService.js'


const logo = require("../../assets/logo.png");
// eslint-disable-next-line
const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSwL6QEGjHRyGx0Dv4tpZjxelnG2MWh1A-9MFs2rw9MZDG-gWgWj86z5e0prysSigS6I&usqp=CAU";

const Navbar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const SigninPath = history.location.pathname === "/signin";
  const SignupPath = history.location.pathname === "/signup";
  const user = useSelector((state) => state.userReducer.loggedInUser);
  const onLoginPages = SigninPath || SignupPath;

  const onLogout = async () => {
    await UserService.logout();
    dispatch({ type: "LOGOUT" });
    history.push("/signin");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div className="container col-12">
        <Link className="navbar-brand" href="/" to="/">
          <img src={logo} alt="ls-techs" width="131"></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {!SigninPath && !SignupPath && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/contact">
                    Contact
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="flex-center">
          {!(Object.keys(user).length === 0) && (
            <>
              <img
                className="user-img"
                src={user.image}
                alt="user img"
                width="32"
              />
              <p>
                {user.fname} {user.lname}
              </p>
            </>
          )}
        </div>

        {!onLoginPages && (
          <div className="mx-4" onClick={() => onLogout()}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
