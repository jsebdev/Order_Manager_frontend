import React from "react";
import { Context } from "../../../Context/AppContext";
import { Orders } from "../Orders";
import { useParams } from "react-router-dom";

export const ClientOrders = () => {
  const { setOrders, updateItems } = React.useContext(Context);
  const { clientId } = useParams();
  React.useEffect(() => {
    updateItems("orders/user/" + clientId, setOrders);
  }, []);
  return <Orders title="Orders from user"></Orders>;
};
