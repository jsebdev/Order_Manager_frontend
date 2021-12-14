import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";

function Dashboard({ userName }) {
  const colClass = `col-option col-8 offset-2 col-md-3 my-2 d-flex flex-column text-center py-4`;
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
          <div className={`${colClass} offset-md-2`}>
            <i class="bi bi-file-earmark-plus icon-option"></i>
            <p> New Order </p>
          </div>
          <div className={`${colClass} offset-md-2`}>
            <i class="bi bi-search icon-option"></i>
            <p> Search </p>
          </div>
          <div className={`${colClass} offset-md-2`}>
            <i class="bi bi-journal-bookmark-fill icon-option"></i>
            <p> Orders </p>
          </div>
          <div className={`${colClass} offset-md-2`}>
            <i class="bi bi-person-lines-fill icon-option"></i>
            <p> Clients </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { Dashboard };
