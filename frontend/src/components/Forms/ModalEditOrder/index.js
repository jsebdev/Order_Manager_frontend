import React from "react";
import { Context } from "../../../Context/AppContext";

export const ModalEditOrder = () => {
  const { orderToEdit, editOrder, setShowSpinner, updateItems, setOrders } =
    React.useContext(Context);
  const [msg, setMsg] = React.useState(null);

  return (
    <React.Fragment>
      <h2 className="form-title">Edit Order</h2>
      <form
        className="form-style"
        onSubmit={async (event) => {
          event.preventDefault();
          setMsg(null);
          setShowSpinner(true);
          const res = await editOrder({
            order_id: event.target.id.value,
            client_id: event.target.clientid.value,
            subtotal: event.target.subtotal.value,
            taxes: event.target.taxes.value,
            paid: event.target.paid.checked,
            sent: event.target.sent.checked,
          });
          setMsg(res.msg);
          updateItems("order", setClients);
          setShowSpinner(false);
        }}
      >
        <div>
          <label htmlFor="order_id">order Id:</label>
          <input
            className="client-id"
            defaultValue={orderToEdit.order_id}
            type="text"
            name="order_id"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="subtotal">Subtotal:</label>
          <input
            defaultValue={orderToEdit.subtotal}
            type="number"
            name="subtotal"
            required
          />
        </div>
        <div>
          <label htmlFor="taxes">Taxes:</label>
          <input type="number" name="taxes" defaultValue={orderToEdit.taxes} />
        </div>
        <div>
          <label htmlFor="paid">Paid:</label>
          {orderToEdit.paid ? (
            <input type="checkbox" name="paid" defaultChecked />
          ) : (
            <input type="checkbox" name="paid" />
          )}
        </div>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        <button className="btn btn-primary btn-form" type="submit">
          Update Client
        </button>
      </form>
    </React.Fragment>
  );
};