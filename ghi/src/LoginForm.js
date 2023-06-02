import React, { useState } from "react";
import { useLoginMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ username, password });

    if (response.error) {
      alert("Login failed", response.error);
    } else {
      e.target.reset();
      navigate("/");
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4134225/pexels-photo-4134225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-3"></div>
          <div
            className="col-lg-4 col-md-6 login-box p-4 rounded-lg mx-auto" // Added mx-auto class for horizontal centering
            style={{
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.5)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "10px",
              height: "200px",
              width: "300px",
            }}
          >
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">Login</div>
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginTop: "10px" }}
                  />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text">
                    Forgot password
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      style={{ marginTop: "10px" }}
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
