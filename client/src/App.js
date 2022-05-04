import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import { getAuth } from "./fetchMethods/get";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [productsCount, setProductsCount] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    getAuth().then((res) => setUser(res.user));
  }, []);

  useEffect(() => {
    setProductsCount(productsInCart.length);
  }, [productsInCart]);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path="/*" element={<Home setUser={setUser} setProductsInCart={setProductsInCart} />}></Route>

          <Route path="/account" element={<Account user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} user={user} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} user={user} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
