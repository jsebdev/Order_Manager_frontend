import React from "react";
import { Context } from "../../Context/AppContext";

export const Payments = () => {
  const { orderToEdit } = React.useContext(Context);
  React.useEffect(() => {
    console.log("la order to edit is", orderToEdit);
  }, [orderToEdit]);
  return (
    <React.Fragment>
      <h2 className="form-title">Payments</h2>
      {orderToEdit.payments[0] ? <p>hay payments</p> : <p>No hay payments</p>}
    </React.Fragment>
  );
};
