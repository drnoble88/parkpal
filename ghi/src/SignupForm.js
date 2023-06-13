import React, { useState } from "react";
import { useSignupMutation } from "./store/apiSlice";
import { useNavigate } from "react-router-dom";
import { containerStyle1, glassmorphismStyle} from "./styling"

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup({ username, fullname, email, password });
    if (response.error) {
      console.log("Signup successful!");
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div style={containerStyle1}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div
            className="col-lg-6 col-md-8 login-box"
            style={glassmorphismStyle}
          >
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title font-link" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"10px"}}><h3>Sign-Up Today!</h3></div>
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-control-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label"></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label"></label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label"></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="login-btm login-button mt-3">
                      <button type="submit" className="btn btn-dark mt-2">
                        Sign Up
                      </button>
                    </div>
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

export default SignupForm;
