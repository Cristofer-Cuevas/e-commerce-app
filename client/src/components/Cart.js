import React, { useEffect, useState } from "react";
import addIcon from "../styles/images/add_FILL0_wght400_GRAD0_opsz48.svg";
import removeIcon from "../styles/images/remove_FILL0_wght400_GRAD0_opsz48.svg";

const Cart = ({ products }) => {
  const handleRemoveClick = () => {};
  const handleAddClick = () => {};

  const handleInpChange = () => {};

  return (
    <>
      {products ? (
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-bold m-4">YOUR CART</h2>
          <div className="flex w-4/5 mt-12">
            <div className="img">
              <img className="w-32" src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" alt="product" />
            </div>
            <div className="ml-10">
              <div className="">
                <h3 className="font-medium  text-sm">"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats"</h3>
                <div className="flex  items-center my-4 border border-black border-solid w-fit py-1 px-2">
                  <span onClick={handleRemoveClick} className="mr-4">
                    <img className="w-4" src={removeIcon} alt="add" />
                  </span>
                  <input className="w-6 text-center" type="number" value="1" min="1" max="20" readOnly onChange={handleInpChange} />
                  <span onClick={handleAddClick} className="ml-4">
                    <img className="w-4" src={addIcon} alt="substract" />
                  </span>
                </div>
              </div>
              <div className="">
                <p className="font-medium">$ 56.99</p>
                <button className="text-xs">Remove</button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Cart;
