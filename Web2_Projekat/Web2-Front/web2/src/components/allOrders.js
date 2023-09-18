import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";
import Orders from "../reusable/Order/order";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminApi.getOrders().then((res) => setOrders(res));
  }, []);

  return (
    <Flex h="100%">
      <Dashboard>
        <Orders orders={orders} title={"Sve Porudžbine"} />
      </Dashboard>
    </Flex>
  );
};

export default AllOrders;
