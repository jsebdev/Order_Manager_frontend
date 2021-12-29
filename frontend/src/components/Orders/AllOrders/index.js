import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";

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
