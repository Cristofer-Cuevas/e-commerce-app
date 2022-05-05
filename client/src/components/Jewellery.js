import React, { useEffect, useState, useRef } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";

const Jewellery = ({ setProductsInCart, inputSearchValue }) => {
  const [products, setProducts] = useState(false);
  const filterProducts = useRef(null);

  useEffect(() => {
    getProducts("jewellery").then((res) => {
      filterProducts.current = res.jewellery;
      setProducts(res.jewellery);
    });
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Jewellery</h1>
        <Products setProductsInCart={setProductsInCart} products={products} filterProducts={filterProducts} inputSearchValue={inputSearchValue} setProducts={setProducts} />
      </section>
    </>
  );
};

export default Jewellery;
