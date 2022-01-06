import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import "./header.scss";

/**
 * Header component
 * @returns Header component
 */
function Header() {
  const handleClick = () => setShowSidebar(!showSidebar);
  const {
    userName,
    logout,
    showSidebar,
    setShowSidebar,
    mobileView,
    setShowSearchModal,
    setShowNewOrderModal,
  } = React.useContext(Context);

  return (
    <header className="container-fluid p-0">
      <div className="header-container w-100 header d-flex align-items-center justify-content-between px-4">
        {mobileView && (
          <Link to="/">
            <i className="bi bi-journal-code fs-1"></i>
          </Link>
        )}
        <nav
          className={
            "navbar " +
            (mobileView ? "flex-column justify-content-start " : "") +
            (showSidebar ? "active" : "")
          }
        >
          {!mobileView && (
            <Link to="/">
              <i className="bi bi-journal-code fs-1"></i>
            </Link>
          )}
          <ul className="user-links">
            {userName ? (
              <React.Fragment>
                <li className="fs-4">
                  <p className="m-0">Hello {userName}</p>
                </li>
                <li className="login-link">
                  <Link
                    to="/"
                    onClick={() => {
                      setShowSidebar(false);
                      logout();
                    }}
                  >
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
                <Link to="/dashboard/orders">Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/clients">Clients</Link>
              </li>
              <li>
                <Link to="#" onClick={() => setShowSearchModal(true)}>
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={() => setShowNewOrderModal((value) => !value)}
                >
                  New Order
                </Link>
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
