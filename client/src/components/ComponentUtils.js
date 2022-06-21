import React, { useEffect, useRef, useCallback } from "react";
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
export const InputSearch = ({ inputRef, onInput }) => {
  return <input className="px-4 z-0 w-full h-10 rounded-l " ref={inputRef} type="text" autoComplete="on" placeholder="Search for products" onInput={onInput} />;
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

export const Products = ({ products, setProductsInCart, setProducts, filterProducts, inputSearchValue }) => {
  const num = useRef(0);
  const carouselRef = useRef(null);
  const numOfProducts = useRef(0);
  // This array is for saving the id of products that are already in the cart to not add it twice
  const idOfProductsClicked = useRef([0]);

  // Media query, this shows the num of products based on x width
  useEffect(() => {
    if (products?.length === 1) {
      numOfProducts.current = 1;
    } else if (products?.length === 2) {
      numOfProducts.current = 1;
    } else if (window.innerWidth >= 700) {
      numOfProducts.current = Math.floor(products.length / 2);
    } else if (window.innerWidth >= 375) {
      numOfProducts.current = products?.length;
    }
  }, [numOfProducts, products]);

  useEffect(() => {
    if (filterProducts?.current?.length > 0) {
      setProducts(filterProducts.current.filter((product) => product.title.toLowerCase().includes(inputSearchValue?.toLowerCase() || "")));
    }
  }, [inputSearchValue, filterProducts, setProducts]);

  // This func prevents a console error when trying to assign the property transform when there is still no element on the DOM.
  const assingTransformProperty = useCallback(
    (element) => {
      if (element.current) {
        carouselRef.current.style.transform = `translateX(-${parseInt(num.current + "00") / numOfProducts.current}%)`;
      }
    },
    [numOfProducts]
  );

  const handleArrBackClick = () => {
    --num.current;

    if (num.current <= -1) {
      num.current = numOfProducts.current - 1;
    }
    assingTransformProperty(carouselRef);
  };

  useEffect(() => {
    if (products?.length > 0) {
      Array.from(carouselRef?.current?.children).forEach((productInDOM) => {
        productInDOM.style.width = productInDOM.style.width = 100 / numOfProducts + "%";
      });
    }

    if (carouselRef.current) {
      carouselRef.current.style.width = numOfProducts.current + "00%";
    }
  }, [products, numOfProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      ++num.current;
      if (num.current >= numOfProducts.current) {
        num.current = 0;
      }
      assingTransformProperty(carouselRef);
    }, 5000);

    return () => clearInterval(interval);
  }, [num, numOfProducts, assingTransformProperty]);

  const handleArrForwardClick = () => {
    ++num.current;
    if (num.current >= numOfProducts.current) {
      num.current = 0;
    }
    assingTransformProperty(carouselRef);
  };

  const handleBuyNowClick = (e) => {
    const clickedProductId = parseInt(e.target.dataset.index);

    const clickedProduct = products.filter((product) => product.id === clickedProductId);

    if (idOfProductsClicked.current.every((productId) => productId !== clickedProduct[0].id)) {
      idOfProductsClicked.current.push(clickedProductId);
      clickedProduct[0].quantity = 1;
      if (clickedProduct[0]) {
        setProductsInCart((products) => [...products, ...clickedProduct]);
      }
    }
  };

  return (
    <>
      {!products ? (
        <Loading />
      ) : products.length > 0 ? (
        <div className=" w-11/12 shadow-6xl mx-auto m-10 relative h-boxCont overflow-hidden">
          <div ref={carouselRef} className="transition duration-700 ease-out flex h-prodCont mt-10  flex-no-wrap ">
            {products.map((product) => {
              return (
                <div key={product.id} className="w-full h-prodCont">
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
        <p className="text-center mt-10">No product could be found</p>
      )}
    </>
  );
};
