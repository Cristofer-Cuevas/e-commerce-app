import React, { useEffect, useState, useRef } from "react";
import { ProductBox } from "./ComponentUtils";
const Fashion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("https://fakestoreapi.com/products/category/women's clothing")
        .then((res) => res.json())
        .then((res) => {
          setData((data) => {
            return [...res, ...data];
          });
          console.log(res);
        });
    })();
    (async () => {
      await fetch("https://fakestoreapi.com/products/category/men's clothing")
        .then((res) => res.json())
        .then((res) => {
          setData((data) => {
            return [...res, ...data];
          });
          console.log(res);
        });
    })();
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h1 className="font-bold text-3xl text-center">Man and Woman Fashion</h1>
      {data
        ? data.map((clothe) => {
            return <ProductBox key={clothe.id} product={clothe} />;
          })
        : null}
    </section>
  );
};

export default Fashion;
