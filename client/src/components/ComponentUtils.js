import React from "react";

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
  return <input className=" z-0 w-full h-10 rounded-l " ref={inputRef} type="search" autoComplete="on" placeholder="Search for products" />;
};

export const ProductBox = ({ product }) => {
  return (
    <div className="w-11/12 mt-10 shadow-6xl">
      <p className="font-bold text-center pt-10 px-6">{product.title}</p>
      <p className="my-4 text-center">
        <span className="text-orange-500 ">Price</span> $ {product.price}
      </p>
      <img className="w-32 mx-auto" src={product.image} alt="Clothe" />
      <button className="mx-auto block my-6 font-bold text-orange-500 ">Buy Now</button>
    </div>
  );
};
