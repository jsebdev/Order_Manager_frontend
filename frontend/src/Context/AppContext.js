import React, { useState, useEffect } from "react";

const Context = React.createContext();

function Provider({ children }) {
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileView, setMobileView] = useState(true);

  const checkMobile = () => {
    if (window.innerWidth <= 1000) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  window.addEventListener("resize", checkMobile);
  useEffect(() => checkMobile(), []);

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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
