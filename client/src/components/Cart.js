import React, { useEffect, useState, useRef } from "react";

const Cart = ({ productsInCart }) => {
  const [products, setProducts] = useState();
  const inpuRef = useRef(0);

  useEffect(() => {
    setProducts(productsInCart);
  }, [productsInCart]);

  const handleRemoveClick = (e) => {
    console.log(inpuRef.current.value);
    const index = parseInt(e.target.dataset.index);

    setProducts((products) => {
      return products.map((product) => {
        if (index === product.id) {
          const sum = product.price / (inpuRef.current.value - 1);
          product.price += sum;
        }
        return product;
      });
    });

    console.log(products);
    ++e.target.nextElementSibling.value;
    productsInCart.forEach((product) => {
      if (parseInt(e.target.dataset.index) === product.id) {
        product.quantity = e.target.nextElementSibling.value;
      }
    });

    console.log(productsInCart);
  };
  const handleAddClick = () => {};

  const handleInpChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <h2 className="text-2xl font-bold m-4">YOUR CART</h2>
        {products
          ? products.map((product) => {
              return (
                <div key={product.id} data-index={product.id} className="flex w-4/5 mt-12">
                  <div className="img">
                    <img className="w-32" src={product.image} alt="product" />
                  </div>
                  <div className="ml-10">
                    <div className="">
                      <h3 className="font-medium  text-sm">{product.title}</h3>
                      <div className="flex  items-center my-4 border border-black border-solid w-fit py-1 px-2">
                        <button data-index={product.id} onClick={handleRemoveClick} className="mr-4 w-4">
                          {/* <img className="w-4" src={removeIcon} alt="add" /> */} -
                        </button>
                        <input className="w-6 text-center" type="number" value={product.quantity || 1} min="0" max="20" readOnly onChange={handleInpChange} ref={inpuRef} />
                        <button onClick={handleAddClick} className="ml-4">
                          {/* <img className="w-4" src={addIcon} alt="substract" /> */} +
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <p className="font-medium">$ {product.price}</p>
                      <button className="text-xs">Remove</button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </section>
    </>
  );
};

export default Cart;
