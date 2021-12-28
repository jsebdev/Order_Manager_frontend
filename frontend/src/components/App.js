import "./App.scss";
import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { Login } from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Context/AppContext";
import { Dashboard } from "./Dashboard";
import { Clients } from "./Clients";
import { ModalNew } from "./ModalNew";
import { NewOrder } from "./Forms/NewOrder";
import { Test } from "./test";
import { ModalEditClient } from "./Forms/ModalEditClient";
import { ModalEditOrder } from "./Forms/ModalEditOrder";
import { LoadingSpinner } from "./LoadingSpinner";
import { AllOrders } from "./Orders/AllOrders";
import { ClientOrders } from "./Orders/ClientOrders";
import { ShippingInfo } from "./ShippingInfo";
import { Payments } from "./Payments";
import { SearchModal } from "./Forms/SearchModal";
import { Orders } from "./Orders/Orders";

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
    showNewOrderModal,
    setShowNewOrderModal,
    showEditClientModal,
    setShowEditClientModal,
    showSpinner,
    showEditOrderModal,
    setShowEditOrderModal,
    showShippingInfo,
    setShowShippingInfo,
    showPayments,
    setShowPayments,
    showSearchModal,
    setShowSearchModal,
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
      <div className="body-container">
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
              <Dashboard
                userName={userName}
                setShowNewOrderModal={setShowNewOrderModal}
              />
            }
          ></Route>
          <Route
            path="/dashboard/orders"
            element={<AllOrders></AllOrders>}
          ></Route>
          <Route
            path="/dashboard/orders/:clientId"
            element={<ClientOrders />}
          ></Route>
          <Route
            path="/dashboard/clients"
            element={<Clients></Clients>}
          ></Route>
          <Route
            path="/loading"
            element={<LoadingSpinner></LoadingSpinner>}
          ></Route>
          <Route path="/test" element={<Test></Test>}></Route>
          <Route path="/search" element={<Orders></Orders>}></Route>
        </Routes>
      </div>
      {showNewOrderModal && (
        <ModalNew
          setShowModal={setShowNewOrderModal}
          elementId={"new-order-modal"}
        >
          <NewOrder></NewOrder>
        </ModalNew>
      )}
      {showEditClientModal && (
        <ModalNew
          setShowModal={setShowEditClientModal}
          elementId={"edit-client-modal"}
        >
          <ModalEditClient></ModalEditClient>
        </ModalNew>
      )}
      {showEditOrderModal && (
        <ModalNew
          setShowModal={setShowEditOrderModal}
          elementId={"edit-order-modal"}
        >
          <ModalEditOrder></ModalEditOrder>
        </ModalNew>
      )}
      {showShippingInfo && (
        <ModalNew
          setShowModal={setShowShippingInfo}
          elementId={"shipping-info-modal"}
        >
          <ShippingInfo></ShippingInfo>
        </ModalNew>
      )}
      {showPayments && (
        <ModalNew setShowModal={setShowPayments} elementId={"payments-modal"}>
          <Payments></Payments>
        </ModalNew>
      )}
      {showSearchModal && (
        <ModalNew setShowModal={setShowSearchModal} elementId={"search-modal"}>
          <SearchModal></SearchModal>
        </ModalNew>
      )}
      {showSpinner && <LoadingSpinner></LoadingSpinner>}
    </React.Fragment>
  );
};

export { App };
