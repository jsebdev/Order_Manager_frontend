import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";

function Header({ userName, logout }) {
  const [click, setClick] = useState(false);
  const [movileView, setMovileView] = useState(true);
  const navigate = useNavigate();

  const resizeHeaderClasses = () => {
    if (window.innerWidth <= 1000) {
      setMovileView(true);
    } else {
      setMovileView(false);
    }
  };

  const closeSideBarAndGo = () => {};

  window.addEventListener("resize", resizeHeaderClasses);

  const handleClick = () => setClick(!click);

  useEffect(() => resizeHeaderClasses(), []);
  return (
    <header className="container-fluid p-0">
      <div className="header-container w-100 header d-flex align-items-center justify-content-between px-4">
        <Link to="/">
          <i className="bi bi-journal-code fs-1"></i>
        </Link>
        <nav
          className={
            "navbar " +
            (movileView
              ? "flex-column justify-content-start "
              : "flex-row-reverse ") +
            (click ? "active" : "")
          }
        >
          <ul className="user-links">
            {userName ? (
              <React.Fragment>
                <li className="fs-4">
                  <p>Hola {userName}</p>
                </li>
                <li className="login-link">
                  <button onClick={logout}>Log out</button>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="login-link">
                  <Link to="/signup">Sign up</Link>
                </li>
                <li className="login-link">
                  <button
                    onClick={() => {
                      setClick(false);
                      navigate("/login");
                    }}
                  >
                    Log in
                  </button>
                  {/* // <Link to="/login">Log in</Link> */}
                </li>
              </React.Fragment>
            )}
          </ul>
          <ul className="nav-menu">
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
          </ul>
        </nav>
        {movileView && (
          <div
            className={"menu-icon " + (click ? "rotate-45" : "")}
            onClick={handleClick}
          >
            <i className={"fs-1 " + (click ? "bi bi-plus" : "bi bi-list")}></i>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };
