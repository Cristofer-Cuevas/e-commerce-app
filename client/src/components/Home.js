import React, { useState, useRef } from "react";
import { InputSearch } from "./ComponentUtils";
import cartIcon from "../styles/images/shopping_cart_white_24dp.svg";
import searchIcon from "../styles/images/search_black_24dp.svg";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";
import menuIcon from "../styles/images/menu_white_24dp.svg";
import closeIcon from "../styles/images/close_white_24dp.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const navBarRef = useRef(null);
  const inputRef = useRef(null);
  // Show menu
  const handleMenuClick = (e) => {
    navBarRef.current.classList.remove("-left-full");
    setTimeout(() => {
      navBarRef.current.classList.add("left-0", "w-64");
    }, 1);
  };
  // Hide menu
  const handleCloseClick = (e) => {
    navBarRef.current.classList.remove("w-64");
    setTimeout(() => {
      navBarRef.current.classList.add("-left-full");
    }, 1);
  };

  return (
    <>
      <section className="bg-hero-image bg-cover bg-center   h-5/6">
        <header className="w-11/12 mx-auto overflow">
          <h1 className="font-bold text-4xl text-center text-white pt-8 ">Shop</h1>
          <div className="flex justify-between mt-10">
            <p className="w-20 text-white">
              <img className="inline-block" src={cartIcon} alt="Cart" /> CART
            </p>
            <Link to="/signin" className="w-26 text-white">
              <img className="inline-block" src={accountIcon} alt="User" /> ACCOUNT
            </Link>
          </div>
          <div className="flex justify-between items-center mt-4 ">
            <div>
              <img onClick={handleMenuClick} className="w-12" src={menuIcon} alt="Menu" />
            </div>
            <div className=" w-4/5 flex rounded-md">
              <InputSearch inputRef={inputRef} />
              <span className="bg-search-icon bg-no-repeat bg-center bg-orange-600 inline-block w-10 h-10 rounded-r"> </span>
            </div>
          </div>
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
        </header>
      </section>
      <main>Hola</main>
    </>
  );
};

export default Home;
