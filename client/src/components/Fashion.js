import React, { useEffect, useState, useRef } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";
const Fashion = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    getProducts("clothes").then((res) => setData(res.clothes));
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Man and Woman Fashion</h1>
        <Products setProductsInCart={setProductsInCart} products={data} />
      </section>
    </>
  );
};

export default Fashion;
