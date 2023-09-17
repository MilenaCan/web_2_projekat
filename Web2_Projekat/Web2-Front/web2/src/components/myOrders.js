import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import Orders from "../reusable/Order/order";
import { Flex, Box } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    sellerApi.getMyOrders().then((res) => {
      setOrders(res);
    });
  }, []);
  return (
    <Flex h="100vh">
      <Dashboard>
        <Box h="100vh" flex={1}>
          <Orders orders={orders} title={"Porudžbine"} />
        </Box>
      </Dashboard>
    </Flex>
  );
};

export default MyOrders;
