import { Button, Box, Text, Divider, SimpleGrid } from "@chakra-ui/react";
import Item from "./item";
import { dateTimeToString } from "../../helpers/helpers";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import buyerApi from "../../services/buyerApi";

const Orders = ({ orders, title, updateOrders }) => {
  const status = (o) => {
    return o.isCancelled
      ? "Cancelled"
      : !o.approved
      ? "Waiting for approval"
      : new Date(o.deliveryTime) > new Date()
      ? "In delivery"
      : "Delivered";
  };

  const context = useContext(AuthContext);
  const [countdowns, setCountdowns] = useState({});
  const delHours = 1000 * 60 * 60;
  const delMinutes = 1000 * 60;

  useEffect(() => {
    setInterval(() => {
      const temp = {};
      for (const key in countdowns) {
        temp[key] = countdowns[key] - 1;
      }
      setCountdowns(temp);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeToDeliver = (remaining) => {
    const hours = Math.floor(remaining / delHours);
    const minutes = Math.floor((remaining % delHours) / delMinutes);
    const seconds = Math.floor((remaining % delMinutes) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const canBeCancelled = (orderTime) => {
    if (new Date() - new Date(orderTime) > delHours) return false;
    return true;
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      {orders &&
        orders.length > 0 &&
        orders.map((o, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            mt="4"
            backgroundColor="gray.700"
            color="white"
          >
            {!countdowns[index] &&
              status(o) === "In delivery" &&
              setCountdowns({
                ...countdowns,
                [index]: new Date(o.deliveryTime) - new Date(),
              })}
            <Text>Ordered: {dateTimeToString(o.orderTime)}</Text>
            {status(o) === "In delivery" &&
              !context.inType("Administrator") && (
                <Text>Time to deliver: {timeToDeliver(countdowns[index])}</Text>
              )}
            <Text>Address: {o.deliveryAddress}</Text>
            <Text>Status: {status(o)}</Text>
            <Text fontWeight="bold" color="lightblue" mt="2">
              Items:
            </Text>
            <SimpleGrid columns={1} gap="1">
              {o.items.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </SimpleGrid>
            <Divider mt="4" />
            <Text>Comment: {o.comment}</Text>
            <Text>Total: {o.orderPrice.toFixed(2)}$</Text>
            {context.type() === "Buyer" && canBeCancelled(o.orderTime) && (
              <Button
                mt="2"
                colorScheme="red"
                onClick={(e) => {
                  buyerApi.postCancel(o.id).then((res) => updateOrders());
                }}
              >
                Cancel
              </Button>
            )}
          </Box>
        ))}
      {orders.length === 0 && (
        <Text fontSize="xl" color="blue.500">
          There are no orders
        </Text>
      )}
    </Box>
  );
};

export default Orders;
