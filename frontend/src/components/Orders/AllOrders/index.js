import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";

export const AllOrders = () => {
  const { orders, updateItems, setOrders } = React.useContext(Context);
  React.useEffect(() => {
    updateItems("orders", setOrders);
  }, []);
  return <Orders title="All Orders" orders={orders}></Orders>;
};
