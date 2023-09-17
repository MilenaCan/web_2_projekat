import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import ProductsR from "../reusable/Product/productsR";
import { Flex } from "@chakra-ui/react";
import Dashboard from "./dashboard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const updateProducts = () =>
    sellerApi.getProducts().then((res) => setProducts(res));

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <Flex>
      <Dashboard>
        <ProductsR
          products={products}
          updateProducts={updateProducts}
          title={"Moji proizvodi"}
        />
      </Dashboard>
    </Flex>
  );
};

export default Products;
