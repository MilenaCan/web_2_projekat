import { Box, Text, Divider } from "@chakra-ui/react";

const Item = ({ item }) => {
  return (
    <>
      <Divider />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Text fontSize="14" color="darkblue">
            Naziv: {item.name}
          </Text>
        </Box>
        <Box>
          <Text fontSize="14" color="darkblue">
            Količina: {item.amount}
          </Text>
          <Text fontSize="14" color="darkblue">
            Cijena: {item.price}$
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Item;
