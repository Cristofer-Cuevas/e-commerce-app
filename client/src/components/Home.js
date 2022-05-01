import React, { useRef, useContext } from "react";
import { InputSearch, NavBar } from "./ComponentUtils";
import cartIcon from "../styles/images/shopping_cart_white_24dp.svg";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";
import { UserContext } from "../App";

import { Link, Outlet } from "react-router-dom";

const Home = ({ children }) => {
  return (
    <>
      <section className="bg-hero-image bg-cover bg-center h-5/6">
        <Header />
      </section>
      <main className="">
        {children}
        <Outlet />
      </main>
    </>
  );
};

// Header
const Header = () => {
  const user = useContext(UserContext);
  const inputRef = useRef(null);

  return (
    <header className="w-11/12 mx-auto overflow">
      <h1 className="font-bold text-4xl text-center text-white pt-8 ">Shop</h1>
      <div className="flex justify-between mt-10">
        <Link to="cart" className="w-20 text-white">
          <img className="inline-block" src={cartIcon} alt="Cart" /> CART
        </Link>
        <Link to="/account" className="w-26 text-white">
          <img className="inline-block" src={accountIcon} alt="User" /> {user?.name || "Account"}
        </Link>
      </div>
      <div className="flex justify-between items-center mt-4 ">
        <NavBar />
        <div className=" w-4/5 flex rounded-md">
          <InputSearch inputRef={inputRef} />
          <span className="bg-search-icon bg-no-repeat bg-center bg-orange-600 inline-block w-10 h-10 rounded-r"> </span>
        </div>
      </div>
    </header>
  );
};

export default Home;
