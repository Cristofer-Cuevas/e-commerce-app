import React, { useEffect, useState, useRef } from "react";
import { Products, Loading } from "./ComponentUtils";
const Jewellery = () => {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/jewellery")
      .then((res) => res.json())
      .then((res) => setData(res.jewellery));
  }, []);
  return (
    <>
      <section className="w-full pb-20">
        <h1 className="font-bold text-3xl text-center">Man and Woman Fashion</h1>
        <Products products={data} />
      </section>
    </>
  );
};

export default Jewellery;
