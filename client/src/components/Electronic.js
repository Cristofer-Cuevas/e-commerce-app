import React, { useEffect, useState } from "react";
import { Products } from "./ComponentUtils";
import { getProducts } from "../fetchMethods/get";

const Electronic = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    getProducts("electronics").then((res) => setData(res.electronics));
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Electronic</h1>
        <Products setProductsInCart={setProductsInCart} products={data} />
      </section>
    </>
  );
};

export default Electronic;
