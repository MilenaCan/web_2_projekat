import { useContext, useEffect, useState } from "react";
import buyerApi from "../services/buyerApi";
import { CartContext } from "../contexts/cart-context";
import ProductsR from "../reusable/Product/productsR";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const BuyerNewOrder = () => {
  const [products, setProducts] = useState([]);
  const updateProducts = () =>
    buyerApi.getProducts().then((res) => {
      setProducts(res);
      const temp = { ...cart };
      for (const i in res) {
        if (!temp[res[i].id]) temp[res[i].id] = 0;
      }
      setCart(temp);
    });
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    updateProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex>
      <Dashboard>
        <ProductsR
          products={products}
          updateProducts={updateProducts}
          title={"Products"}
        />
      </Dashboard>
    </Flex>
  );
};

export default BuyerNewOrder;
