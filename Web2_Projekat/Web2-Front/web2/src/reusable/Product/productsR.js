import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Text,
  VStack,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import sellerApi from "../../services/sellerApi";
import classes from "./ProductsR.module.css";
import ProductUpdateForm from "./Forms/productUpdateForm";
import ProductAddForm from "./Forms/productAddForm";
import { convertImage } from "../../helpers/helpers";
import AuthContext from "../../contexts/auth-context";
import { CartContext } from "../../contexts/cart-context";
import ConfirmDialog from "./Forms/confirmDiaolg";

const ProductsR = ({ products, updateProducts, title }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const context = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);

  const changeValue = (id, value, maxAmount) => {
    setCart({ ...cart, [id]: value < 0 ? 0 : Math.min(maxAmount, value) });
  };

  const cartNotEmpty = () => {
    for (const i in cart) {
      if (cart[i] > 0) return true;
    }
    return false;
  };

  return (
    <VStack spacing={6} align="center">
      <Text fontSize="xl" color="blue">
        {title}
      </Text>
      <SimpleGrid columns={[1, null, 2]} spacing={6}>
        {context.inType("Seller") && (
          <>
            <ProductUpdateForm
              isOpen={open}
              onClose={() => setOpen(false)}
              data={data}
              setData={setData}
              updateProducts={updateProducts}
            />
            <ProductAddForm updateProducts={updateProducts} />
          </>
        )}

        {context.inType("Buyer") && (
          <ConfirmDialog
            isOpen={open}
            onClose={() => setOpen(false)}
            products={products}
          />
        )}

        {products &&
          products.length > 0 &&
          products.map((p, index) => (
            <Box
              key={index}
              bg="#0c1215"
              color="white"
              maxW="md"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              p={4}
            >
              <Center>
                <Image
                  src={p.image && convertImage(p.image)}
                  alt="Product Image"
                  maxH="150px"
                  objectFit="contain"
                />
              </Center>
              <VStack spacing={2} align="start">
                {context.inType("Seller") && (
                  <Text fontSize="sm">Product ID: {p.id}</Text>
                )}
                {context.inType("Buyer") && (
                  <Text fontSize="sm">Seller: {p.seller.fullName}</Text>
                )}
                <Text fontSize="sm">Name: {p.name}</Text>
                <Text fontSize="sm">Price: {p.price}$</Text>
                <Text fontSize="sm">Amount: {p.amount}</Text>
                <Text fontSize="sm">Description: {p.description}</Text>
              </VStack>
              <Flex justify="space-between">
                {context.inType("Seller") && (
                  <>
                    <Button
                      size="sm"
                      fontWeight="bold"
                      colorScheme="green"
                      onClick={() => {
                        setData({ ...p, imageFile: "" });
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      fontWeight="bold"
                      colorScheme="red"
                      onClick={() =>
                        sellerApi
                          .deleteProduct(p.id)
                          .then((res) => res && updateProducts())
                      }
                    >
                      Delete
                    </Button>
                  </>
                )}

                {context.inType("Buyer") && (
                  <Grid templateColumns="repeat(3, 1fr)" alignItems="center">
                    <Button
                      size="sm"
                      variant="solid"
                      colorScheme="blue"
                      onClick={() =>
                        changeValue(p.id, cart[p.id] - 1, p.amount)
                      }
                    >
                      -
                    </Button>
                    <NumberInput
                      value={cart[p.id]}
                      onChange={(value) => changeValue(p.id, value, p.amount)}
                      min={0}
                      max={p.amount}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button
                      size="sm"
                      variant="solid"
                      colorScheme="blue"
                      onClick={() =>
                        changeValue(p.id, cart[p.id] + 1, p.amount)
                      }
                    >
                      +
                    </Button>
                  </Grid>
                )}
              </Flex>
            </Box>
          ))}
      </SimpleGrid>
      {context.inType("Buyer") && cartNotEmpty() && (
        <Button
          pos="fixed"
          bottom="0"
          right="0"
          zIndex="9999"
          minW="50px"
          minH="50px"
          maxW="50px"
          maxH="50px"
          mr="50px"
          mb="50px"
          colorScheme="green"
          onClick={() => setOpen(true)}
        >
          Buy
        </Button>
      )}
    </VStack>
  );
};

export default ProductsR;
