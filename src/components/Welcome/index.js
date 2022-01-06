import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import "./Welcome.scss";

/**
 * The welcome component show two option, login or sign up. In case a userName already exists, it means the user is already
 * logged in an the user is redirected to the /dashboard
 * @returns The Welcome component
 */
function Welcome() {
  const navigate = useNavigate();
  const { userName } = React.useContext(Context);
  useEffect(() => {
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
          <div className="row mt-5">
            <div className="col-10 offset-1 col-sm-4 offset-sm-1 col-lg-3 offset-lg-2 login-col mb-5">
              <h3>Are you new?</h3>
              <Link to="/signup">Sign up!</Link>
            </div>
            <div className="col-10 offset-1 col-sm-4 offset-sm-2 col-lg-3 offset-lg-2 login-col mb-5">
              <h3>Have an account?</h3>
              <Link to="/login">Log in!</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { Welcome };
