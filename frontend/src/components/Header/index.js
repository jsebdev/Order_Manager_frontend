import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.scss";

function Header({
  userName,
  logout,
  showSidebar,
  setShowSidebar,
  checkMobile,
  mobileView,
}) {
  const handleClick = () => setShowSidebar(!showSidebar);

  // useEffect(() => checkMobile(), []);
  return (
    <header className="container-fluid p-0">
      <div className="header-container w-100 header d-flex align-items-center justify-content-between px-4">
        <Link to="/">
          <i className="bi bi-journal-code fs-1"></i>
        </Link>
        <nav
          className={
            "navbar " +
            (mobileView
              ? "flex-column justify-content-start "
              : "flex-row-reverse ") +
            (showSidebar ? "active" : "")
          }
        >
          <ul className="user-links">
            {userName ? (
              <React.Fragment>
                <li className="fs-4">
                  <p>Hola {userName}</p>
                </li>
                <li className="login-link">
                  <Link to="/" onClick={logout}>
                    Log out
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="login-link">
                  <Link to="/signup" onClick={() => setShowSidebar(false)}>
                    Sign up
                  </Link>
                </li>
                <li className="login-link">
                  <Link to="/login" onClick={() => setShowSidebar(false)}>
                    Log in
                  </Link>
                  {/* // <Link to="/login">Log in</Link> */}
                </li>
              </React.Fragment>
            )}
          </ul>
          {userName && (
            <ul className="nav-menu">
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/clients">Clients</Link>
              </li>
            </ul>
          )}
        </nav>
        {mobileView && (
          <div
            className={"menu-icon " + (showSidebar ? "rotate-45" : "")}
            onClick={handleClick}
          >
            <i
              className={"fs-1 " + (showSidebar ? "bi bi-plus" : "bi bi-list")}
            ></i>
          </div>
        )}
      </div>
    </header>
  );
}

export { Header };
