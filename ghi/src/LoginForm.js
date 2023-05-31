import React, { useState, useEffect, handleSubmit } from "react";
// import { useToken } from "path/to/your/useToken"; // Import the useToken hook from the appropriate path
import { useLoginMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";

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
        backgroundImage: `https://images.pexels.com/photos/4134225/pexels-photo-4134225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">Login Panel</div>
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-6 login-btm login-text">
                    Error Message
                  </div>
                  <div className="col-lg-6 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      LOGIN
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
