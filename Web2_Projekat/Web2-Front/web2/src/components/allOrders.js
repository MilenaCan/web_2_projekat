import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import Orders from "../reusable/Order/order";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminApi.getOrders().then((res) => setOrders(res));
  }, []);

  return <Orders orders={orders} title={"All orders"} />;
};

export default AllOrders;
