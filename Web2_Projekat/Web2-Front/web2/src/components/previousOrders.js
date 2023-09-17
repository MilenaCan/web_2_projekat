import { useEffect, useState } from "react";
import buyerApi from "../services/buyerApi";
import Orders from "../reusable/Order/order";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const updateOrders = () => {
    buyerApi.getOrders().then((res) => setOrders(res));
  };
  useEffect(() => {
    updateOrders();
  }, []);
  return (
    <Orders orders={orders} title={"My orders"} updateOrders={updateOrders} />
  );
};

export default PreviousOrders;
