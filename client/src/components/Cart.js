import React, { useEffect, useState, useRef } from "react";
import { postProductsToPurchase } from "../fetchMethods/post";
import closeIcon from "../styles/images/close_white_24dp.svg";

const Cart = ({ setProductsInCart, productsInCart, user }) => {
  const modalRef = useRef();
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

  const totalPrice = productsInCart.reduce((previousValue, currentValue) => (previousValue += currentValue.price), 0);

  const totalCost = (
    <div className="w-full flex justify-between items-center border border-gray-400 border-solid h-10 mt-10 px-4">
      <p className="font-medium">Total cost</p>
      <p className="font-semibold">$ {totalPrice}</p>
    </div>
  );

  const handleCloseModal = (e) => {
    const showOrHideModal = e.target.dataset.modal;
    if (showOrHideModal === "show") {
      modalRef.current.classList.remove("invisible");
      modalRef.current.classList.add("visible");
    } else if (showOrHideModal === "hide") {
      modalRef.current.classList.remove("visible");
      modalRef.current.classList.add("invisible");
    }
  };

  const handleYesClick = () => {
    postProductsToPurchase(
      productsInCart.map((product) => {
        return { id: product.id, quantity: product.quantity, price: product.price };
      })
    ).then((res) => {
      if (res.success) {
        console.log(user);
        user.credit = res.credit;
        setProductsInCart([]);
      }
      console.log(res);
    });
  };
  const handleNoClick = () => {};

  return (
    <>
      <section className="flex flex-col items-center">
        <h2 className="text-2xl font-bold m-4">YOUR CART</h2>
        {productsInCart
          ? productsInCart.map((product) => {
              return (
                <div key={product.id} data-index={product.id} className="flex w-4/5 mt-12 border-b border-gray-400 border-solid pb-4">
                  <div className="w-1/2">
                    <img className="" src={product.image} alt="product" />
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
          {totalCost}
          <p className="text-sm mt-2">
            Available credit: <span className="text-green-600 font-medium">$ {user.credit}</span>
          </p>
          <button onClick={handleCloseModal} data-modal="show" className="text-white bg-sky-700 w-full my-6 h-12">
            PROCEED TO BUY
          </button>
        </div>
        <div ref={modalRef} className="invisible shadow-6xl fixed w-11/12 bg-white top-1/4 rounded	">
          <div className="flex justify-between items-center px-4 bg-red-500 text-white h-14 rounded-t">
            <h3>Confirm purchase</h3>
            <img className="w-6" onClick={handleCloseModal} data-modal="hide" src={closeIcon} alt="Close" />
          </div>
          {totalCost}
          <p className="my-10 px-4 text-center">
            Your credit will be: <span className="text-green-600 font-medium">{user.credit - totalPrice} </span> after the purchase.<span className="text-red-600"> Do you want to continue? </span>
          </p>
          <div className="flex justify-around my-6">
            <button onClick={handleYesClick} className="h-10 bg-red-600 w-32 text-white font-medium">
              Yes!
            </button>
            <button onClick={handleNoClick} className="h-10 border-2 border-red-600 border-solid w-32 font-medium text-red-600">
              No
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
