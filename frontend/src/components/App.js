import "./App.scss";
import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { Login } from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Context/AppContext";
import { Dashboard } from "./Dashboard";
import { Orders } from "./Orders";
import { Clients } from "./Clients";
import { ModalNew } from "./ModalNew";
import { NewOrder } from "./NewOrder";
import { DropDown } from "./test";

const App = () => {
  const {
    userName,
    login,
    checkUser,
    logout,
    showSidebar,
    setShowSidebar,
    mobileView,
    signup,
    fetchAll,
    showModal,
    setShowModal,
  } = useContext(Context);

  React.useEffect(() => {
    checkUser();
  });

  return (
    <React.Fragment>
      <Header
        userName={userName}
        logout={logout}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        mobileView={mobileView}
      ></Header>
      <div>
        <Routes>
          <Route path="/" element={<Welcome userName={userName} />}></Route>
          <Route
            path="/login"
            element={<Login login={login} userName={userName} />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup signup={signup} userName={userName} />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <Dashboard userName={userName} setShowModal={setShowModal} />
            }
          ></Route>
          <Route path="/dashboard/orders" element={<Orders></Orders>}></Route>
          <Route
            path="/dashboard/clients"
            element={<Clients></Clients>}
          ></Route>
          <Route path="/dropdown" element={<DropDown />}></Route>
        </Routes>
      </div>
      {showModal && (
        <ModalNew setShowModal={setShowModal}>
          <NewOrder></NewOrder>
        </ModalNew>
      )}
    </React.Fragment>
  );
};

export { App };
