import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";

/**
 * This Component sets the ordersToFetch state to fetch all orders in the database
 * @returns Returns the orders component where all orders will be displayed
 */
export const AllOrders = () => {
  const { generateURL, setOrdersToFetch, updateItems, setOrders } =
    React.useContext(Context);
  React.useEffect(() => {
    const url = generateURL("orders");
    setOrdersToFetch({ url: url, title: "All Orders" });
    updateItems(url, setOrders);
  }, []);
  return <Orders></Orders>;
};
