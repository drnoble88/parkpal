import React, { useState } from "react";
// import { useToken } from "path/to/your/useToken"; // Import the useToken hook from the appropriate path

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(username, password);
    e.target.reset();
  };

  return (
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
                  {/* Error Message */}
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
  );
};

export default LoginForm;
