import React from "react";
import { Context } from "../../../Context/AppContext";

export const FormEditShipping = ({ shipping_info, action }) => {
  const {
    ordersToFetch,
    editItem,
    setShowSpinner,
    updateItems,
    setOrders,
    createShipping,
    orderToEdit,
    setOrderToEdit,
    orders,
  } = React.useContext(Context);
  const [msg, setMsg] = React.useState(null);

  const submitShipping = async (event) => {
    event.preventDefault();
    setMsg(null);
    setShowSpinner(true);
    const shipping = {
      shipping_id: shipping_info.id,
      order_id: orderToEdit.order_id,
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      country: event.target.country.value,
      cost: event.target.cost.value === "" ? 0 : event.target.cost.value,
      delivered: event.target.delivered.checked,
    };
    let res;
    if (action === "edit") {
      res = await editItem(shipping, "updateshipping");
    } else if (action === "create") {
      res = await createShipping(shipping);
    }
    setMsg(res.msg);
    updateItems(ordersToFetch.endpoint, setOrders);
    setShowSpinner(false);
  };

  React.useEffect(() => {
    setOrderToEdit(
      orders.filter((order) => order.order_id === orderToEdit.order_id)[0]
    );
  }, [orders]);

  return (
    <form className="form-style" onSubmit={(event) => submitShipping(event)}>
      <div className="grid-input">
        <label htmlFor="address">Address:</label>
        <input
          defaultValue={shipping_info.address}
          type="text"
          name="address"
        />
      </div>
      <div className="grid-input">
        <label htmlFor="city">City:</label>
        <input defaultValue={shipping_info.city} type="text" name="city" />
      </div>
      <div className="grid-input">
        <label htmlFor="state">State:</label>
        <input defaultValue={shipping_info.state} type="text" name="state" />
      </div>
      <div className="grid-input">
        <label htmlFor="country">Country:</label>
        <input
          defaultValue={shipping_info.country}
          type="text"
          name="country"
        />
      </div>
      <div className="grid-input">
        <label htmlFor="cost">Cost: $</label>
        <input defaultValue={shipping_info.cost} type="number" name="cost" />
      </div>
      <div className="grid-input">
        <label htmlFor="delivered">Delivered:</label>
        <input
          defaultChecked={shipping_info.delivered}
          type="checkbox"
          name="delivered"
        />
      </div>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      <button className="btn btn-primary btn-form" type="submit">
        Update Info
      </button>
    </form>
  );
};
