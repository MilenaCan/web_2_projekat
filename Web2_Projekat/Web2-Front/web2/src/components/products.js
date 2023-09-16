import { useEffect, useState } from "react";
import sellerApi from "../services/sellerApi";
import ProductsR from "../reusable/Product/productsR";

const Products = () => {
  const [products, setProducts] = useState([]);
  const updateProducts = () =>
    sellerApi.getProducts().then((res) => setProducts(res));

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <ProductsR
      products={products}
      updateProducts={updateProducts}
      title={"My products"}
    />
  );
};

export default Products;
