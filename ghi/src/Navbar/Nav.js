import "./Navstyle.css";
import React from "react";
import { useLogoutMutation } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";
import logoImage from "./images/51694-removebg-preview (4).png";
function Navbar() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    logout();
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <a className="logo">
            <img src={logoImage} alt='Logo' className="logo-image" />
          </a>
          <h1 className="title">ParkPal</h1>
        </div>

        <div className="App">
          <ul id="navbar">
            <li>
              <a className="active" href="index.html">
                Home
              </a>
            </li>
            <li>
              <a className="active" href="index.html">
                Trip planner
              </a>
            </li>
            <li>
              <a className="active" href="index.html">
                Account
              </a>
            </li>
            <li>
              <button className="button-5" role="button" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
