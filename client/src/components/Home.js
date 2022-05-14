import React, { useRef, useContext, useState, useEffect } from "react";
import { InputSearch, NavBar } from "./ComponentUtils";
import cartIcon from "../styles/images/shopping_cart_white_24dp.svg";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";
import { UserContext } from "../App";
import Jewellery from "./Jewellery";
import Electronic from "./Electronic";
import Fashion from "./Fashion";
import Cart from "./Cart";

import { Link, Routes, Route, useNavigate } from "react-router-dom";

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
          <Route path="cart" element={[<Fashion key={1} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Jewellery key={2} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Electronic key={3} setProductsInCart={setProductsInCart} inputSearchValue={inputSearchValue} />, <Cart key={4} setProductsInCart={setProductsInCart} productsInCart={productsInCart} user={user} />]}></Route>
        </Routes>
        <AddedToCartModal productsInCart={productsInCart} />
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
        <Link to="/account" className="w-26 text-white capitalize">
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

const AddedToCartModal = ({ productsInCart }) => {
  const [productAddedToCart, setProductAddedToCart] = useState(null);

  useEffect(() => {
    setProductAddedToCart(productsInCart[productsInCart.length - 1]);
  }, [productsInCart]);

  const navigate = useNavigate();

  const handleContinueClick = () => {
    setProductAddedToCart(null);
  };

  const handleViewClick = () => {
    navigate("/cart");
  };

  return (
    <>
      {productAddedToCart ? (
        <div className="flex jutify-center top-0 fixed w-full h-screen bg-opact">
          <div className="w-11/12 h-96 rounded mx-auto mt-12 p-4 bg-white">
            <p>Product added to cart</p>
            <div className="flex w-full mx-auto my-12">
              <img className="w-24 h-24" src={productAddedToCart?.image} alt="product" />
              <div className="pl-8">
                <p>{productAddedToCart?.title}</p>
                <p className="mt-4 text-green-600">{productAddedToCart?.price}</p>
              </div>
            </div>

            <div className="flex flex-col items-center w-full text-white">
              <button className="py-4 w-full bg-sky-700 mb-0.5 rounded" onClick={handleContinueClick}>
                Continue shopping
              </button>
              <button className="py-4 w-full bg-sky-700 rounded" onClick={handleViewClick}>
                View Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Home;
