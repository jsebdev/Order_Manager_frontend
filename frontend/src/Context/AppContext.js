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
  const [showSpinner, setShowSpinner] = useState(false);

  const updateItems = (itemsType) => {
    setShowSpinner(true);
    fetchAll(itemsType).then((res) => {
      if (res.status !== 200) {
        setShowNewOrderModal(false);
        setShowSidebar(false);
        logout();
        navigate("/login");
      }
      if (itemsType === "orders") {
        setOrders(res.items || []);
      }
      if (itemsType === "users") {
        setClients(res.items || []);
      }
      setShowSpinner(false);
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
      let res = await fetch("http://localhost:5000/api/v1/delete/" + id, opts);
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
      let res = await fetch("http://localhost:5000/api/v1/createclient", opts);
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

  const createOrder = async ({
    clientId,
    client,
    subtotal,
    taxes,
    paid,
    sent,
  }) => {
    if (!clientId) {
      clientId = await createClient({ client });
    }
    const data = {
      client_id: clientId,
      subtotal: subtotal,
      taxes: taxes,
      paid: paid,
      sent: sent,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch("http://localhost:5000/api/v1/createorder", opts);
      if (res.status !== 200) {
        return { state: false, status: res.status, msg: res.msg };
      }
      return { state: true, status: res.status, msg: res.msg };
    } catch (error) {
      console.log("There was a tragic error", error);
      return { state: false, status: undefined, msg: error };
    }
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
      let res = await fetch("http://localhost:5000/api/v1/login", opts);
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

  const editClient = async (event) => {
    event.preventDefault();
    const data = {
      client_id: event.target.id.value,
      name: event.target.name.value,
      last_name: event.target.lastname.value,
      gov_id: event.target.govid.value,
      email: event.target.email.value,
      company: event.target.company.value,
    };

    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };
    try {
      let res = await fetch("http://localhost:5000/api/v1/updateclient", opts);
      if (res.status === 401) {
        navigate("/login");
      }
      if (res.status !== 200) {
        const status = res.status;
        res = await res.json();
        return { status: status, res: res };
      }
      res = await res.json();
      return { status: 200, msg: "client Updated" };
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
      let res = await fetch("http://localhost:5000/api/v1/signup", opts);
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

  const fetchAll = async (items) => {
    setToken(localStorage.getItem("token"));
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      let res = await fetch("http://localhost:5000/api/v1/" + items, opts);
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
        editClient,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
