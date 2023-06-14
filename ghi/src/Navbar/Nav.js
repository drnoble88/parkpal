import { useState, useEffect } from "react";
import { useLogoutMutation } from "../store/apiSlice";
import { useNavigate, NavLink } from "react-router-dom";
import logoImage from "./images/51694-removebg-preview (4).png";
import { useGetAccountQuery } from "../store/apiSlice";

import "./Navstyle.css";

function Navbar() {
  const { data: account } = useGetAccountQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    await logout();
    navigate("/login");
  };

  return (
    <>
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="logo-container">
          <a className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </a>
          <h1 className="title">ParkPal</h1>
          <ul id="navbar">
            <li className="nav-item">
              <NavLink className="active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {account && (
              <li className="nav-item">
                <NavLink className="active" to="/createtrip">
                  Create Trip
                </NavLink>
              </li>
            )}
            {account && (
              <li className="nav-item">
                <NavLink className="active" to="/mytrips">
                  My Trips
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="auth-links">
          <div className="auth-button">
            {!account && (
              <button
                className="nav-button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            )}
            {!account && (
              <button
                className="nav-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            {account && (
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
