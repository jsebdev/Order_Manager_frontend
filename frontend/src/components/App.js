import "./App.scss";
import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { Login } from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Context/AppContext";
import { Dashboard } from "./Dashboard";

function App() {
  const {
    login,
    userName,
    checkUser,
    logout,
    showSidebar,
    setShowSidebar,
    mobileView,
    signup,
    // checkLogedin,
  } = useContext(Context);

  React.useEffect(() => {
    checkUser();
  });

  return (
    <Router>
      <React.Fragment>
        <Header
          userName={userName}
          logout={logout}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          mobileView={mobileView}
        ></Header>
        <Routes>
          <Route path="/" element={<Welcome userName={userName} />}></Route>
          <Route
            path="/login"
            element={<Login login={login} userName={userName} />}
          ></Route>
          <Route path="/signup" element={<Signup signup={signup} />}></Route>
          <Route
            path="/dashboard"
            element={<Dashboard userName={userName} />}
          ></Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export { App };
