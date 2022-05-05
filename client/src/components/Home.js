import React, { useRef, useContext, useState } from "react";
import { InputSearch, NavBar } from "./ComponentUtils";
import cartIcon from "../styles/images/shopping_cart_white_24dp.svg";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";
import { UserContext } from "../App";
import Jewellery from "./Jewellery";
import Electronic from "./Electronic";
import Fashion from "./Fashion";
import Cart from "./Cart";

import { Link, Routes, Route } from "react-router-dom";

const Home = () => {
  const user = useContext(UserContext);
  const [productsInCart, setProductsInCart] = useState([]);
  const [inputSearchValue, setInputSearchValue] = useState(null);

  return (
    <>
      <section className="bg-hero-image bg-cover bg-center h-5/6">
        <Header setInputSearchValue={setInputSearchValue} user={user} />
      </section>
      <main className="">
        <Routes>
          <Route path="/" element={[<Fashion key={1} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Jewellery key={2} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Electronic key={3} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />]}></Route>

          <Route path="fashion" element={<Fashion inputSearchValue={inputSearchValue} setProductsInCart={setProductsInCart} />} />
          <Route path="jewellery" element={<Jewellery setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />} />
          <Route path="electronic" element={<Electronic setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />} />
          <Route path="cart" element={[<Fashion key={1} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Jewellery key={2} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Electronic key={3} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Cart setProductsInCart={setProductsInCart} productsInCart={productsInCart} user={user} />]}></Route>
        </Routes>
      </main>
    </>
  );
};

// Header
const Header = ({ setInputSearchValue, user }) => {
  const inputRef = useRef(null);

  const handleOnInput = (e) => {
    setInputSearchValue(e.target.value);
  };

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
          <InputSearch inputRef={inputRef} onInput={handleOnInput} />
          <span className="bg-search-icon bg-no-repeat bg-center bg-orange-600 inline-block w-10 h-10 rounded-r"> </span>
        </div>
      </div>
    </header>
  );
};

export default Home;
