import React, { useEffect, useState } from "react";
import { Products } from "./ComponentUtils";
const Jewellery = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/jewellery")
      .then((res) => res.json())
      .then((res) => setData(res.jewellery));
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
