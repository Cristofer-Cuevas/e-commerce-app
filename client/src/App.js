import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Electronic from "./components/Electronic";
import Jewellery from "./components/Jewellery";
import Fashion from "./components/Fashion";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home Fashion={Fashion} Jewellery={Jewellery} Electronic={Electronic} />} />
        <Route path="/jewellery" element={<Home Jewellery={Jewellery} />}></Route>
        <Route path="/Fashion" element={<Home Fashion={Fashion} />} />
        <Route path="/electronic" element={<Home Electronic={Electronic} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
