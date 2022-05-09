import React, { useEffect, useState } from "react";
import { NavBar } from "./ComponentUtils";
import { useNavigate, Navigate } from "react-router-dom";
import { getUserProducts } from "../fetchMethods/get";
import closeIcon from "../styles/images/close_white_24dp.svg";
import { Loading } from "./ComponentUtils";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (user) {
      getUserProducts("purchased-products").then((res) => {
        console.log(res);
        setProducts(res.products);
      });
    }
  }, [user]);

  const handleCloseClick = () => {
    navigate("/");
  };

  return (
    <>
      {!user ? (
        <Navigate to="/signin" replace />
      ) : (
        <section className="bg-gray-200 h-screen">
          <section>
            <header className="flex justify-between items-center px-6 py-4 bg-orange-500">
              <NavBar />
              <div>
                <img className="w-8" onClick={handleCloseClick} src={closeIcon} alt="user" />
              </div>
            </header>
          </section>
          <main>
            <div className="text-center">
              <h1 className="font-bold mt-8 text-2xl">History of purchases</h1>
              <p className="capitalize">
                ({user.name} {user.last_name})
              </p>
            </div>
            <section className="">
              {products ? (
                <table className="w-full text-center mt-12 ">
                  <thead className="bg-sky-700 text-white text-xs font-thin h-20">
                    <tr className="font-thin">
                      <th className="font-thin">Product</th>
                      <th className="font-thin">Quantity</th>
                      <th className="font-thin">Total</th>
                      <th className="font-thin">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr key={index} className="h-28 bg-white border-b-8 border-solid  border-gray-200">
                          <td className="mt-4">
                            <img className="w-12 mx-auto" src={product.image} alt="Product" />
                          </td>
                          <td>{product.quantity}</td>
                          <td>{product.price}</td>
                          <td>{product.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <Loading />
              )}
            </section>
          </main>
        </section>
      )}
    </>
  );
};

export default Account;
