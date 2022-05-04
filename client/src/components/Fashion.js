import React, { useEffect, useState, useRef } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";
const Fashion = ({ setProductsInCart, inputSearchValue }) => {
  const [products, setProducts] = useState(false);
  const filterProducts = useRef([]);

  useEffect(() => {
    getProducts("clothes").then((res) => {
      filterProducts.current = res.clothes;
      setProducts(res.clothes);
    });
  }, []);

  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Man and Woman Fashion</h1>
        <Products setProductsInCart={setProductsInCart} products={products} setProducts={setProducts} inputSearchValue={inputSearchValue} filterProducts={filterProducts} />
      </section>
    </>
  );
};

export default Fashion;
