import {
  Button,
  Box,
  Text,
  Divider,
  SimpleGrid,
  Heading,
  VStack,
  Flex,
  Badge,
  Center,
} from "@chakra-ui/react";
import Item from "./item";
import { dateTimeToString } from "../../helpers/helpers";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import buyerApi from "../../services/buyerApi";

const Orders = ({ orders, title, updateOrders }) => {
  const status = (o) => {
    return o.isCancelled
      ? "Otkazana"
      : !o.approved
      ? "Na čekanju"
      : new Date(o.deliveryTime) > new Date()
      ? "Dostavlja se"
      : "Dostavljeno";
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
      <Center>
        <Heading as="h3" size="lg" fontWeight="bold" mb="4">
          {title}
        </Heading>
      </Center>
      <VStack spacing="4">
        {orders &&
          orders.length > 0 &&
          orders.map((o, index) => (
            <Box
              key={index}
              p="4"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              shadow="md"
              bgColor="gray.100"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="bold">
                  Poručeno: {dateTimeToString(o.orderTime)}
                </Text>
                <Badge
                  colorScheme={status(o) === "In delivery" ? "blue" : "gray"}
                >
                  {status(o)}
                </Badge>
              </Flex>
              {status(o) === "In delivery" &&
                !context.inType("Administrator") && (
                  <Text mt="2">
                    Time to deliver: {timeToDeliver(countdowns[index])}
                  </Text>
                )}
              <Text mt="2">Adresa: {o.deliveryAddress}</Text>
              <Text fontWeight="bold" color="blue.600" mt="2">
                Stavke:
              </Text>
              <SimpleGrid columns={1} gap="2">
                {o.items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </SimpleGrid>
              <Divider mt="4" />
              <Text>Komentar: {o.comment}</Text>
              <Text fontWeight="bold" mt="2">
                Ukupno: {o.orderPrice.toFixed(2)}$
              </Text>
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
      </VStack>
      {orders.length === 0 && (
        <Text fontSize="xl" color="blue.500" mt="4">
          Nema porudžbina
        </Text>
      )}
    </Box>
  );
};

export default Orders;
