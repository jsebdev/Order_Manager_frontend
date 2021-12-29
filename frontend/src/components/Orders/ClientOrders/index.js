import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";
import { useParams } from "react-router-dom";

export const ClientOrders = () => {
  const { generateURL, setOrdersToFetch, setOrders, updateItems } =
    React.useContext(Context);
  const { clientId } = useParams();
  React.useEffect(() => {
    const url = generateURL("orders/user/" + clientId);
    setOrdersToFetch((orders) => {
      orders.url = url;
      return orders;
    });
    updateItems(url, setOrders);
  }, []);
  return <Orders></Orders>;
};
