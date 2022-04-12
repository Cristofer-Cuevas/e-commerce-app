import React, { useState, useRef } from "react";
import { InputSearch } from "./ComponentUtils";
import cartIcon from "../styles/images/shopping_cart_white_24dp.svg";
import searchIcon from "../styles/images/search_black_24dp.svg";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";
import menuIcon from "../styles/images/menu_white_24dp.svg";
import closeIcon from "../styles/images/close_white_24dp.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const handleMenuClick = (e) => {};
  const handleCloseClick = (e) => {};

  const inputRef = useRef(null);
  return (
    <>
      <section className="bg-hero-image bg-cover bg-center   h-5/6">
        <header className="w-11/12 mx-auto">
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
          <nav className="fixed bg-black h-full top-0 left-0 text-white w-0 z-50">
            <div className="flex h-16 justify-end pr-5">
              <img className="w-8" onClick={handleCloseClick} src={closeIcon} alt="Close" />
            </div>
            <ul className="">
              <li className=" pl-4 py-4 text-2xl">
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
