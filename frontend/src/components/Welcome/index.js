import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Welcome.scss";

function Welcome({ userName }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(userName);
    if (userName !== null) {
      navigate("/dashboard");
    }
  });
  return (
    <React.Fragment>
      <div className="container justify-content-center mt-5">
        <h1 className="fs-1 text-center">
          Welcome to your daily order manager
        </h1>
        <div className="container login-container">
          <div className="row align-items-start mt-5">
            <div className="col login-col">
              <div className="login-container-sm">
                <h3>Are you new?</h3>
                <Link to="/signup">Sign up!</Link>
              </div>
            </div>
            <div className="col login-col">
              <div className="login-container-sm">
                <h3>Have an account?</h3>
                <Link to="/login">Log in!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { Welcome };
