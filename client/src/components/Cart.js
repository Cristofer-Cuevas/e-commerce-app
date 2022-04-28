import React, { useEffect, useState, useRef } from "react";

const Cart = ({ setProductsInCart, productsInCart }) => {
  const inpuRef = useRef(0);

  const handleAddClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const products = productsInCart.map((product) => {
      if (index === product.id) {
        const sum = product.price / product.quantity;
        ++product.quantity;
        product.price += sum;
      }
      return product;
    });
    setProductsInCart(products);
  };
  const handleSubtractClick = (e) => {
    const index = parseInt(e.target.dataset.index);
    const products = productsInCart.map((product) => {
      if (index === product.id) {
        if (product.quantity > 1) {
          const sum = product.price / product.quantity;
          --product.quantity;
          product.price = sum * product.quantity;
        }
      }
      return product;
    });

    setProductsInCart(products);
  };

  const handleRemoveClick = (e) => {
    const clickedElement = parseInt(e.target.dataset.index);
    setProductsInCart((products) => products.filter((product) => product.id !== clickedElement));
  };

  const handleInpChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <h2 className="text-2xl font-bold m-4">YOUR CART</h2>
        {productsInCart
          ? productsInCart.map((product) => {
              return (
                <div key={product.id} data-index={product.id} className="flex w-4/5 mt-12 border-b border-gray-400 border-solid pb-4">
                  <div className="img">
                    <img className="w-32" src={product.image} alt="product" />
                  </div>
                  <div className="ml-10">
                    <div className="">
                      <h3 className="font-medium  text-sm">{product.title}</h3>
                      <div className="flex  items-center my-4 border border-black border-solid w-fit py-1 px-2">
                        <button data-index={product.id} onClick={handleSubtractClick} className="mr-4 w-4">
                          -
                        </button>
                        <input className="w-6 text-center" type="number" onChange={handleInpChange} ref={inpuRef} value={product.quantity} readOnly />
                        <button data-index={product.id} onClick={handleAddClick} className="ml-4">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <p className="font-medium">$ {product.price}</p>
                      <button className="text-xs" data-index={product.id} onClick={handleRemoveClick}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        <div className="w-4/5">
          <div className="w-full flex justify-between items-center border border-gray-400 border-solid h-10 mt-10 px-4">
            <p className="font-medium">Total cost</p>
            <p className="font-semibold">$ {productsInCart.reduce((previousValue, currentValue) => (previousValue += currentValue.price), 0)}</p>
          </div>
          <p className="text-sm mt-2">
            Available credit: <span className="text-green-600 font-medium">$ 500</span>
          </p>
          <button className="text-white bg-sky-700 w-full my-6 h-12">PROCEED TO BUY</button>
        </div>
      </section>
    </>
  );
};

export default Cart;
