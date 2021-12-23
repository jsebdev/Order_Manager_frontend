import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";

export const AllOrders = () => {
  const { ordersToFetch, setOrdersToFetch, orders, updateItems, setOrders } =
    React.useContext(Context);
  React.useEffect(() => {
    const endpoint = "orders";
    setOrdersToFetch({ endpoint: endpoint });
    updateItems(endpoint, setOrders);
  }, []);
  return <Orders title="All Orders" orders={orders}></Orders>;
};
