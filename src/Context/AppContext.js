import { getRoles } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @type {React.Context<Any>}
 * Context of the whole application
 */
const Context = React.createContext();

/**
 * Returns the provider with all common functions the app is going to use
 * @sig {children} -> Context.Provider
 * @param {JSX.Element} props.children - Elements to place inside the provider
 * @returns Returns the provider
 */
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

  /**
   * This functions updates the orders or the users defined by the url to fetch
   * @param {url} url - url to fetch items
   * @param {setter} setter - setter function to update items fetched
   * @returns A promise of an object with message in the parameter msg
   */
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

  /**
   * This function sets the mobileView state depending of the innerWidth of the window
   * If the innerWidth is less or equal to 1000, is set true, false otherwise
   */
  const checkMobile = () => {
    if (window.innerWidth <= 1000) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  /**
   * @typedef {Object} - fetchResponse
   * This object contains information from the response of a fetch action
   * @property {Boolean} state - if the response was successful the state is true, false if the response was a failure
   * @property {Number} status - Http status code of the response
   * @property {String} msg - message obtained from the response
   * @property {Object} res - Response if the state is false
   * @property {Array<Objects>} items - Array of object gotten from the response if the state is true
   */

  /**
   * Make a DELETE request to delete item
   * @param {String} id - id of the item to delete
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * Make a POST request to create a new client
   * @param {String} client.name - Client's name
   * @param {String} client.lastname - Client's last name
   * @param {String} client.govid - Client's government id
   * @param {String} client.email - Client's email
   * @param {String} client.company - Client's email
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * Search orders according to the searchType argument. After the call to the updateItems function, the url is redirected to "/search"
   * @param {String} searchType -  Kind of search to do, it can be one of "by-id", "by-date", "by-location"
   * @param {String} order.orderId -  Order's id
   * @param {String} order.startDate -  Start date in date range
   * @param {String} order.startDate -  End date in date range
   * @param {String} order.city -  Shipping's city
   * @param {String} order.state -  Shipping's state
   * @param {String} order.country -  Shipping's country
   *
   */
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

  /**
   * This function create a new url
   * @param {endpoint} endpoint - endpoint of the url
   * @param {Object} params - Object with variables as parameter to send in a get request
   * @returns A new URL
   */
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

  /**
   * This functions send a POST request to create a new order and if necessary send a POST request to create a new client
   * @param {Object} clientToCreate - Object with the client's attributes to create if any
   * @param {order} order - Object with the order's attributes to create
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * This functions send a POST request to create a new payment
   * @param {Object} payment - Object with the payment's attributes
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * This functions send a POST request to create a new payment
   * @param {Object} shipping - Object with the shipping's attributes
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * @typedef {Object} - fetchOpts
   * This object contains the options for a fetch
   * @property {String} method - HTTP method
   * @property {Object} headers - Object with Http headers as attributes
   * @property {Body} msg - message obtained from the response
   */

  /**
   * This function fetch the url with the options in opts, if the response status is 401 or 422, it means the app is redirected to the login page
   * @param {URL} url - the url
   * @param {fetchOps} opts - Object with options for the fetch
   * @returns {Promise<Response>} - Returns a promise of the fetch's response
   */
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
    return res;
  };

  /**
   * This function sends a POST request to perform a login
   * @param {String} email - User's email for login
   * @param {String} password - User's password for login
   * @returns {Boolean} - Returns true if the login was successful, false otherwise
   */
  const login = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };

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

  /**
   * This functions performs a POST request to update an item
   * @param {Object} item - Object with item's attributes to update
   * @param {String} endpoint - endpoint to send request
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * Performs the sign up process for a new user
   * @param {String} name - Name of the new user
   * @param {email} email - Email of the new user
   * @param {password} password - Password of the new user
   * @returns {Boolean} True if the sign up was successful, false otherwise
   */
  const signup = async (name, email, password) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
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

  /**
   * Sets the userName and token status if they are saved in the localstorage
   */
  const checkUser = () => {
    const name = localStorage.getItem("userName");
    setUserName(name);
    const tok = localStorage.getItem("token");
    setToken(tok);
  };

  /**
   * Deletes the userName and token from the localstorage and from the respectives states
   */
  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName(null);
    setToken(null);
  };

  /**
   * Fetch and array of items from the url
   * @param {URL} url - url to fetch array of items
   * @returns {fetchResponse} - fetchResponse object with information from the fetch response
   */
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

  /**
   * Add the resize listener to the windows.
   */
  window.addEventListener("resize", checkMobile);

  /**
   * Check whether the windows's with is over 1000 px
   */
  useEffect(() => checkMobile(), []);

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
