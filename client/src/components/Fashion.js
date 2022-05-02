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

  useEffect(() => {
    if (inputSearchValue) {
      setProducts(filterProducts.current.filter((product) => product.title.toLowerCase().includes(inputSearchValue.toLowerCase() || "*")));
    } else {
      setProducts(filterProducts.current);
    }
  }, [inputSearchValue]);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Man and Woman Fashion</h1>
        <Products setProductsInCart={setProductsInCart} products={products} inputSearchValue={inputSearchValue} />
      </section>
    </>
  );
};

export default Fashion;
