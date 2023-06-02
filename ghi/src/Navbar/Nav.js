import "./Navstyle.css";
import React, { useState } from "react";
import { useLogoutMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import logoImage from "./images/51694-removebg-preview (4).png";
import { NavLink } from "react-router-dom";
import { useGetAccountQuery } from "../store/apiSlice";
function Navbar() {
  const {data: account} = useGetAccountQuery()
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async (e) => {
    logout();
    e.preventDefault();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <a className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </a>
          <h1 className="title">ParkPal</h1>
        </div>

        <div className="App">
          <ul id="navbar">
            <li className="nav-item">
              <NavLink className="active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {account && <li className="nav-item">
              <NavLink className="active" href="index.html" to="/createtrip">
                Create Trip
              </NavLink>
            </li>}  
            {account && <li className="nav-item">
              <NavLink className="active" to="/mytrips">
                My Trips
              </NavLink>
            </li>}
          </ul>
        </div>
        <div className="auth-links">
          <div className="auth-button">
            {!account && <button className="nav-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>}
            {!account && <button className="nav-button" onClick={() => navigate("/login")}>
              Login
            </button>}
            {account && <button className="nav-button" role="button" onClick={handleLogout}>
              Logout
            </button>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
