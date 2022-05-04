import React, { useEffect, useState, useRef } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";

const Electronic = ({ setProductsInCart, inputSearchValue }) => {
  const [products, setProducts] = useState(false);
  const filterProducts = useRef([]);

  useEffect(() => {
    getProducts("electronics").then((res) => {
      filterProducts.current = res.electronics;
      setProducts(res.electronics);
    });
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Electronic</h1>
        <Products setProductsInCart={setProductsInCart} products={products} setProducts={setProducts} filterProducts={filterProducts} inputSearchValue={inputSearchValue} />
      </section>
    </>
  );
};

export default Electronic;
