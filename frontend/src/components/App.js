import "./App.scss";
import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { Login } from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Store/AppContext";

function App() {
  const { login, userName, checkUser, logout } = useContext(Context);

  React.useEffect(() => {
    checkUser();
  });

  return (
    <Router>
      <React.Fragment>
        <Header userName={userName} logout={logout}></Header>
        <Routes>
          <Route path="/" element={<Welcome userName={userName} />}></Route>
          <Route path="/login" element={<Login login={login} />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export { App };
