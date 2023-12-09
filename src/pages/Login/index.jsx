import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./style.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    toast.success(`Welcome Back 😉`)
  };

  return (
    <div classNaame="container-fluid ps-md-0">
      <div classNaame="row g-0">
        <div classNaame="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div classNaame="col-md-8 col-lg-6">
          <div classNaame="login d-flex align-items-center py-5">
            <div classNaame="container">
              <div classNaame="row">
                <div classNaame="col-md-9 col-lg-8 mx-auto">
                  <h3 classNaame="login-heading mb-4">Welcome back!</h3>
                  <form onSubmit={handleSubmit}>
                    <div classNaame="form-floating mb-3">
                      <input
                        type="email"
                        classNaame="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={handleEmailChange}
                      />
                      <label for="floatingInput">Email address</label>
                    </div>
                    <div classNaame="form-floating mb-3">
                      <input
                        type="password"
                        classNaame="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div classNaame="form-check mb-3">
                      <input
                        classNaame="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberPasswordCheck"
                      />
                      <label
                        classNaame="form-check-label"
                        for="rememberPasswordCheck"
                      >
                        Remember password
                      </label>
                    </div>

                    <div classNaame="d-grid">
                      <button
                        classNaame="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
