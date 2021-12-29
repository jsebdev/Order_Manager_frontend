import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./Context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
