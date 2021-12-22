import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";
import { useParams } from "react-router-dom";

export const UserOrders = () => {
  const { userOrders, setUserOrders, updateItems } = React.useContext(Context);
  const { clientId } = useParams();
  React.useEffect(() => {
    updateItems("orders/user/" + clientId, setUserOrders);
  }, []);
  return <Orders title="Orders from user" orders={userOrders}></Orders>;
};
