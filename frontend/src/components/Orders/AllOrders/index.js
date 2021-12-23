import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";

export const AllOrders = () => {
  const {
    ordersEndpointToFetch,
    setOrdersEndpointToFetch,
    orders,
    updateItems,
    setOrders,
  } = React.useContext(Context);
  React.useEffect(() => {
    setOrdersEndpointToFetch("orders");
    updateItems(ordersEndpointToFetch, setOrders);
  }, []);
  return <Orders title="All Orders" orders={orders}></Orders>;
};
