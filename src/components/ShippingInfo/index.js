import React from "react";
import { Context } from "../../Context/AppContext";
import { FormEditShipping } from "./FormEditShipping";

/**
 * The shipping modal contains whether a button to add shipping info to the order if the order does not have
 * shipping info or displays the form to edit the shipping info
 * @returns Shipping modal
 */
export const ShippingInfo = () => {
  const { orderToEdit, orders } = React.useContext(Context);
  const [addShippingInfo, setAddShippingInfo] = React.useState(false);

  return (
    <React.Fragment>
      <h2 className="form-title">Shipping Info</h2>
      {orderToEdit.shipping_info ? (
        <>
          <FormEditShipping
            shipping_info={orderToEdit.shipping_info}
            action="edit"
          ></FormEditShipping>
        </>
      ) : (
        <>
          {!addShippingInfo ? (
            <div className="form-style">
              <p>No shipping Info</p>
              <button
                className="btn btn-primary btn-form"
                onClick={() => {
                  setAddShippingInfo(true);
                }}
              >
                Add Shipping Info
              </button>
            </div>
          ) : (
            <>
              <FormEditShipping
                shipping_info={{}}
                action="create"
              ></FormEditShipping>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};
