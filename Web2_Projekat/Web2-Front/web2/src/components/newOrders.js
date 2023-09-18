import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import Orders from "../reusable/Order/order";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    sellerApi.getNewOrders().then((res) => setOrders(res));
  }, []);

  return (
    <Flex h="100%">
      <Dashboard>
        <Orders orders={orders} title={"Nove porudžbine"} />
      </Dashboard>
    </Flex>
  );
};

export default NewOrders;
