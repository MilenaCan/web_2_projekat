import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import Orders from "../reusable/Order/order";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    sellerApi.getMyOrders().then((res) => {
      setOrders(res);
    });
  }, []);
  return <Orders orders={orders} title={"Orders"} />;
};

export default MyOrders;
