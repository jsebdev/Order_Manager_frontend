import React from "react";
import { Context } from "../../../Context/AppContext";
import "./SearchModal.scss";

export const SearchModal = () => {
  const [searchType, setSearchType] = React.useState("by-id");
  const { searchOrders, setShowSpinner } = React.useContext(Context);

  const submitSearch = (event) => {
    event.preventDefault();
    setShowSpinner(true);
    searchOrders(searchType, {
      orderId: event.target.orderId.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
    });
    setShowSpinner(false);
  };

  return (
    <>
      <h2 className="form-title">Search</h2>
      <form className="search-form" onSubmit={(event) => submitSearch(event)}>
        <div className="accordion w-100 accordion-flus" id="accordion-search">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                onClick={() => setSearchType("by-id")}
              >
                Search order by id
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordion-search"
            >
              <div className="accordion-body">
                <div className="search-input grid-input">
                  <label htmlFor="orderId">Order Id:</label>
                  <input
                    type="text"
                    name="orderId"
                    required={searchType === "by-id"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                onClick={() => setSearchType("by-date")}
              >
                Search orders by dates
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordion-search"
            >
              <div className="accordion-body">
                <div className="search-input grid-input">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    name="startDate"
                    required={searchType === "by-date"}
                  />
                </div>
                <div className="search-input grid-input">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    name="endDate"
                    required={searchType === "by-date"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
                onClick={() => setSearchType("by-location")}
              >
                Search Orders by location
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordion-search"
            >
              <div className="accordion-body">
                <div className="search-input grid-input">
                  <label htmlFor="country">Country: </label>
                  <input
                    type="text"
                    name="country"
                    required={searchType === "by-location"}
                  />
                </div>
                <div className="search-input grid-input">
                  <label htmlFor="state">State: </label>
                  <input
                    type="text"
                    name="state"
                    required={searchType === "by-location"}
                  />
                </div>
                <div className="search-input grid-input">
                  <label htmlFor="city">City: </label>
                  <input
                    type="text"
                    name="city"
                    required={searchType === "by-location"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary m-2" type="submit">
          Search
        </button>
      </form>
    </>
  );
};
