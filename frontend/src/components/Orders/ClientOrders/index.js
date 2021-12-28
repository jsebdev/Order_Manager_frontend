import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";
import { useParams } from "react-router-dom";

export const ClientOrders = () => {
  const { ordersToFetch, setOrdersToFetch, setOrders, updateItems } =
    React.useContext(Context);
  const { clientId } = useParams();
  React.useEffect(() => {
    const endpoint = "orders/user/" + clientId;
    setOrdersToFetch((orders) => {
      orders.endpoint = endpoint;
      return orders;
    });
    updateItems(endpoint, setOrders);
  }, []);
  return <Orders></Orders>;
};
