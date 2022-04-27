import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../styles/images/menu_white_24dp.svg";
import closeIcon from "../styles/images/close_white_24dp.svg";

export const Input = ({ placeholder, type, inputRef, autoComplete, className }) => <input className={`${className || ""} w-full h-16 bg-transparent pl-12 focus:border-transparent outline-none focus:border-sky-500 focus:border-2 focus:rounded-md border-2 border-transparent placeholder:text-slate-600`} ref={inputRef} type={type} placeholder={placeholder} autoComplete={autoComplete} />;

export const Loading = () => {
  return (
    <div className="sk-chase mx-auto mt-20 ">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
  );
};

export const LoginError = ({ text }) => {
  return <p className="text-center text-red-600 mt-5 text-green border-red-500 border-2 rounded-md py-2">{text}</p>;
};

// input for searching products
export const InputSearch = ({ inputRef }) => {
  return <input className="px-4 z-0 w-full h-10 rounded-l " ref={inputRef} type="search" autoComplete="on" placeholder="Search for products" />;
};

export const NavBar = () => {
  const navBarRef = useRef(null);
  // Show menu
  const handleMenuClick = (e) => {
    navBarRef.current.classList.remove("-left-full");
    setTimeout(() => {
      navBarRef.current.classList.add("left-0", "w-64");
    }, 1);
  };
  // Hide menu
  const handleCloseClick = (e) => {
    navBarRef.current.classList.remove("left-0", "w-64");
    setTimeout(() => {
      navBarRef.current.classList.add("-left-full");
    }, 1);
  };

  return (
    <div>
      <img onClick={handleMenuClick} className="w-12" src={menuIcon} alt="Menu" />
      <nav className="fixed overflow-hidden bg-black h-full top-0 -left-full text-white z-50" ref={navBarRef}>
        <div className="flex h-16 justify-end pr-5  top-2.5">
          <img className="w-8" onClick={handleCloseClick} src={closeIcon} alt="Close" />
        </div>
        <ul className="">
          <li className="pl-4 py-4 text-2xl">
            <Link to="/">Home</Link>
          </li>
          <li className="pl-4 text-2xl">
            <Link to="/fashion">Fashion</Link>
          </li>
          <li className="pl-4 py-4 text-2xl">
            <Link to="/electronic">Electronic</Link>
          </li>
          <li className="pl-4 text-2xl">
            <Link to="/jewellery">Jewellery</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Products = ({ products, setProductsInCart }) => {
  const num = useRef(0);
  const carouselRef = useRef(null);
  const numOfProducts = products.length;

  const handleArrBackClick = () => {
    --num.current;

    if (num.current <= -1) {
      num.current = numOfProducts - 1;
    }
    carouselRef.current.style.transform = `translateX(-${num.current}00%)`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      ++num.current;
      if (num.current >= numOfProducts) {
        num.current = 0;
      }
      carouselRef.current.style.transform = `translateX(-${num.current}00%)`;
    }, 5000);

    return () => clearInterval(interval);
  }, [num, numOfProducts]);

  const handleArrForwardClick = () => {
    ++num.current;
    if (num.current >= numOfProducts) {
      num.current = 0;
    }
    console.log(num);
    carouselRef.current.style.transform = `translateX(-${num.current}00%)`;
  };

  const handleBuyNowClick = (e) => {
    const clickedProductId = parseInt(e.target.dataset.index);

    const clickedProduct = products.filter((product) => product.id === clickedProductId);

    clickedProduct[0].quantity = 1;
    console.log(clickedProduct);

    setProductsInCart((products) => [...products, ...clickedProduct]);
  };

  return (
    <>
      {products ? (
        <div className=" w-11/12 shadow-6xl mx-auto m-10 relative h-boxCont overflow-hidden">
          <div ref={carouselRef} className="transition duration-700 ease-out flex flex-col items-center h-prodCont mx-auto mt-10  flex-wrap w-full ">
            {products.map((product) => {
              return (
                <div key={product.id} className="w-full  h-prodCont">
                  <p className="font-semibold text-center px-6">{product.title}</p>
                  <p className="my-6 text-center">
                    <span className="text-orange-500 ">Price</span> $ {product.price}
                  </p>
                  <img className="w-40 mx-auto" src={product.image} alt="Clothe" />
                  <button className="mx-auto block my-8 font-bold text-orange-500" data-index={product.id} onClick={handleBuyNowClick}>
                    Buy Now
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-around mt-6">
            <button onClick={handleArrBackClick} className="bg-black bg-arrBack bg-center w-10 h-10 bg-no-repeat"></button>
            <button onClick={handleArrForwardClick} className="bg-black bg-arrForward bg-center w-10 h-10 bg-no-repeat"></button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
