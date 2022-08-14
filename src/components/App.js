import "./App.scss";
import { Header } from "./Header";
import { Welcome } from "./Welcome";
import { Login } from "./Forms/Login";
import { Signup } from "./Forms/Signup";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../Context/AppContext";
import { Dashboard } from "./Dashboard";
import { Clients } from "./Clients";
import { ModalNew } from "./ModalNew";
import { NewOrder } from "./Forms/NewOrder";
import { ModalEditClient } from "./Forms/ModalEditClient";
import { ModalEditOrder } from "./Forms/ModalEditOrder";
import { LoadingSpinner } from "./LoadingSpinner";
import { AllOrders } from "./Orders/AllOrders";
import { ClientOrders } from "./Orders/ClientOrders";
import { ShippingInfo } from "./ShippingInfo";
import { Payments } from "./Payments";
import { SearchModal } from "./Forms/SearchModal";
import { Orders } from "./Orders/Orders";
import { Navigate } from "react-router-dom";

/**
 * This is the main component
 * @returns Returns the main App
 */
const App = () => {
  const {
    userName,
    login,
    checkUser,
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

  const location = useLocation();

  console.log("la location is ", location);

  React.useEffect(() => {
    checkUser();
  });

  return (
    <React.Fragment>
      <Header></Header>
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route
            path="/Order_Manager_frontend/"
            element={<Navigate replace to="/"></Navigate>}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
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
