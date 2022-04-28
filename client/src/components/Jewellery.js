import React, { useEffect, useState } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";

const Jewellery = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    getProducts("jewellery").then((res) => setData(res.jewellery));
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Jewellery</h1>
        <Products setProductsInCart={setProductsInCart} products={data} />
      </section>
    </>
  );
};

export default Jewellery;
