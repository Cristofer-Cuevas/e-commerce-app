import React, { useEffect, useState } from "react";
import { Products } from "./ComponentUtils";
const Electronic = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/electronics")
      .then((res) => res.json())
      .then((res) => setData(res.electronics));
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
