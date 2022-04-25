import React, { useRef, useCallback, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Electronic from "./components/Electronic";
import Jewellery from "./components/Jewellery";
import Fashion from "./components/Fashion";
import Cart from "./components/Cart";

function App() {
  const [productsCount, setProductsCount] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    setProductsCount(productsInCart.length);
  }, [productsInCart]);

  console.log(productsCount);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home>
                <Fashion setProductsInCart={setProductsInCart} />
                <Jewellery setProductsInCart={setProductsInCart} />
                <Electronic setProductsInCart={setProductsInCart} />
              </Home>
            }
          />
          <Route
            path="/jewellery"
            element={
              <Home>
                <Jewellery setProductsInCart={setProductsInCart} />
              </Home>
            }
          />
          <Route
            path="/Fashion"
            element={
              <Home>
                <Fashion setProductsInCart={setProductsInCart} />
              </Home>
            }
          />
          <Route
            path="/electronic"
            element={
              <Home>
                <Electronic setProductsInCart={setProductsInCart} />
              </Home>
            }
          />
          <Route path="/cart" element={<Cart setProductsInCart={setProductsInCart} productsInCart={productsInCart} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
