import React, { useEffect, useState, useRef } from "react";
import { Products } from "./ComponentUtils";
const Fashion = ({ setProductsInCart }) => {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/clothes")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.clothes);
        setData(res.clothes);
      });
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
