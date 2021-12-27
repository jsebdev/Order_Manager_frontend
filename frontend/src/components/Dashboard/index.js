import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import "./dashboard.scss";

function Dashboard() {
  const colClass = `col-option col-8 offset-2 col-md-3 my-2 d-flex flex-column text-center py-4`;
  const { userName, setShowNewOrderModal, setShowSearchModal } =
    React.useContext(Context);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  });

  return (
    <React.Fragment>
      <div className="container">
        <div className="row pt-5">
          <div
            className={`${colClass} offset-md-2`}
            onClick={() => {
              setShowNewOrderModal((value) => !value);
            }}
          >
            <i className="bi bi-bag-plus-fill icon-option"></i>
            <p>New Order</p>
          </div>
          <div
            className={`${colClass} offset-md-2`}
            onClick={() => setShowSearchModal(true)}
          >
            <i className="bi bi-search icon-option"></i>
            <p> Search </p>
          </div>
          <div className={`${colClass} offset-md-2`}>
            <Link to="/dashboard/orders">
              <i className="bi bi-journal-bookmark-fill icon-option"></i>
              <p> Orders </p>
            </Link>
          </div>
          <div className={`${colClass} offset-md-2`}>
            <Link to="/dashboard/clients">
              <i className="bi bi-person-lines-fill icon-option"></i>
              <p> Clients </p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { Dashboard };
