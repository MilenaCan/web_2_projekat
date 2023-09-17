import { useEffect, useState } from "react";
import buyerApi from "../services/buyerApi";
import Orders from "../reusable/Order/order";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const updateOrders = () => {
    buyerApi.getOrders().then((res) => setOrders(res));
  };
  useEffect(() => {
    updateOrders();
  }, []);
  return (
    <Flex h="100vh">
      <Dashboard>
        <Orders
          orders={orders}
          title={"My orders"}
          updateOrders={updateOrders}
        />
      </Dashboard>
    </Flex>
  );
};

export default PreviousOrders;
