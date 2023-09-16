import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import Orders from "../reusable/Order/order";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    sellerApi.getNewOrders().then((res) => setOrders(res));
  }, []);
  return <Orders orders={orders} title={"New orders"} />;
};

export default NewOrders;
