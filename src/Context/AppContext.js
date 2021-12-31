import { getRoles } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Context = React.createContext();

function Provider({ children }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileView, setMobileView] = useState(true);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [clientToEdit, setClientToEdit] = useState({});
  const [orderToEdit, setOrderToEdit] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [showEditOrderModal, setShowEditOrderModal] = useState(false);
  const [ordersToFetch, setOrdersToFetch] = useState({});
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const updateItems = (url, setter) => {
    return new Promise((resolve) => {
      setShowSpinner(true);
      fetchAll(url).then((res) => {
        if (res.status !== 200 && res.status !== 404) {
          setShowNewOrderModal(false);
          setShowSidebar(false);
          logout();
          navigate("/login");
        }
        setter(res.items || []);
        setShowSpinner(false);
        resolve({ msg: "item updated" });
      });
    });
  };

  const checkMobile = () => {
    if (window.innerWidth <= 1000) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  window.addEventListener("resize", checkMobile);
  useEffect(() => checkMobile(), []);

  const deleteItem = async (id) => {
    const opts = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      let res = await checkFetch(generateURL("delete/" + id), opts);
      if (res.status !== 200) {
        return { state: false, status: res.status, msg: res.msg };
      }
      let response = await res.json();
      return {
        state: true,
        status: res.status,
        msg: response.msg,
      };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
  };

  const createClient = async ({ name, lastname, govid, email, company }) => {
    const data = { name, last_name: lastname, gov_id: govid, email, company };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch(generateURL("createclient"), opts);
      if (res.status !== 200) {
        return { state: false, status: res.status, msg: res.msg };
      }
      let response = await res.json();
      return {
        state: true,
        status: res.status,
        msg: response.msg,
        client: response.client,
      };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
  };

  const searchOrders = async (
    searchType,
    { orderId, startDate, endDate, city, state, country }
  ) => {
    let url = null;
    let title;
    console.log("the search type is", searchType);
    switch (searchType) {
      case "by-id":
        url = generateURL("orders/" + orderId);
        title = "Order by Id";
        break;
      case "by-date":
        url = generateURL("orders/" + startDate + " - " + endDate);
        title = `Orders between ${startDate} and ${endDate}`;
        break;
      case "by-location":
        url = generateURL("orders/shipping", { city, state, country });
        title = `Orders in ${city} ${state} ${country}`;
        break;
    }
    setOrdersToFetch({ url: url, title: title });
    await updateItems(url, setOrders);
    setShowSearchModal(false);
    navigate("/search");
  };

  const generateURL = (endpoint, params = null) => {
    // const url = new URL("http://localhost:5000/api/v1/" + endpoint);
    const url = new URL(
      "https://order-manager-api.herokuapp.com/api/v1/" + endpoint
    );
    if (params) {
      url.search = new URLSearchParams(params);
    }
    return url;
  };

  const createOrder = async (clientToCreate, order) => {
    if (clientToCreate) {
      const res = await createClient(clientToCreate);
      if (res.state) {
        order.client_id = res.client.id;
      } else {
        order.client_id = undefined;
      }
    }
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(order),
    };
    try {
      let res = await fetch(generateURL("createorder"), opts);
      if (res.status !== 200) {
        res = await res.json();
        return {
          state: false,
          status: res.status,
          msg: res.msg,
          order: null,
        };
      }
      res = await res.json();
      return {
        state: true,
        status: res.status,
        msg: res.msg,
        order: res.order,
      };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
  };

  const createPayment = async (payment) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payment),
    };
    try {
      let res = await checkFetch(generateURL("createpayment"), opts);
      if (res.status !== 200) {
        return { state: false, status: res.status, msg: res.msg };
      }
      return { state: true, status: res.status, msg: res.msg };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
  };

  const createShipping = async (shipping) => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(shipping),
    };
    try {
      let res = await fetch(generateURL("createshipping"), opts);
      if (res.status !== 200) {
        res = await res.json();
        return { state: false, status: res.status, msg: res.msg };
      }
      res = await res.json();
      return { state: true, status: res.status, msg: res.msg };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
  };

  const checkFetch = async (url, opts) => {
    const res = await fetch(url, opts);
    if (res.status === 401 || res.status === 422) {
      setShowNewOrderModal(false);
      setShowEditClientModal(false);
      setShowEditOrderModal(false);
      setShowShippingInfo(false);
      setShowSpinner(false);
      setShowPayments(false);
      setShowSearchModal(false);
      logout();
      navigate("/login");
    }
    // if (res.status !== 200) {
    //   alert('something went wrong status code :'+res.status)
    // }
    return res;
  };

  const login = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };

    // console.log(JSON.stringify(data));
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch(generateURL("login"), opts);
      if (res.status === 401) {
        alert("Wrong password or email");
        return false;
      }
      if (res.status !== 200) {
        alert(`Something wrong happened, status code is ${res.status}`);
        return false;
      }
      res = await res.json();
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("userName", res.user.name);
      setUserName(res.user.name);
      setToken(res.access_token);
      return true;
    } catch (error) {
      console.log("There was a tragic error", error);
    }
  };

  const editItem = async (item, endpoint) => {
    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };
    try {
      let res = await checkFetch(generateURL(endpoint), opts);
      if (res.status !== 200) {
        const status = res.status;
        res = await res.json();
        return { status: status, res: res };
      }
      res = await res.json();
      return { status: 200, msg: res.msg };
    } catch (error) {
      console.log("There was a tragic error", error);
      return {
        state: false,
        status: undefined,
        msg: error,
        res: undefined,
        items: [],
      };
    }
  };

  const signup = async (name, email, password) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    // console.log(JSON.stringify(data));
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch(generateURL("signup"), opts);
      if (res.status === 405) {
        alert("There is an user with that email already");
        return false;
      }
      if (res.status !== 200) {
        alert(`Something wrong happened, status code is ${res.status}`);
        return false;
      }
      res = await res.json();
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("userName", res.user.name);
      setUserName(res.user.name);
      setToken(res.access_token);
      return true;
    } catch (error) {
      console.log("There was a tragic error", error);
    }
  };

  const checkUser = () => {
    const name = localStorage.getItem("userName");
    setUserName(name);
    const tok = localStorage.getItem("token");
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };

  const fetchAll = async (url) => {
    setToken(localStorage.getItem("token"));
    const tokenAux = localStorage.getItem("token");
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAux,
      },
    };
    try {
      let res = await checkFetch(url, opts);
      if (res.status !== 200) {
        const status = res.status;
        res = await res.json();
        // alert(
        //   `Something wrong happened, status code is ${status} \nmsg: ${res.msg}`
        // );
        return { status: status, res: res, items: [] };
      }
      res = await res.json();
      return { status: 200, items: res };
    } catch (error) {
      console.log("There was a tragic error", error);
      return {
        state: false,
        status: undefined,
        msg: error,
        res: undefined,
        items: [],
      };
    }
  };

  return (
    <Context.Provider
      value={{
        login,
        signup,
        userName,
        token,
        checkUser,
        logout,
        showSidebar,
        setShowSidebar,
        mobileView,
        checkMobile,
        fetchAll,
        showNewOrderModal,
        setShowNewOrderModal,
        clients,
        setClients,
        orders,
        setOrders,
        createOrder,
        createClient,
        navigate,
        deleteItem,
        updateItems,
        showEditClientModal,
        setShowEditClientModal,
        clientToEdit,
        setClientToEdit,
        showSpinner,
        setShowSpinner,
        editItem,
        createPayment,
        createShipping,
        showEditOrderModal,
        setShowEditOrderModal,
        orderToEdit,
        setOrderToEdit,
        ordersToFetch,
        setOrdersToFetch,
        showShippingInfo,
        setShowShippingInfo,
        showPayments,
        setShowPayments,
        showSearchModal,
        setShowSearchModal,
        searchOrders,
        generateURL,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
