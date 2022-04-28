import React, { useEffect, useState } from "react";
import { NavBar } from "./ComponentUtils";
import { Navigate } from "react-router-dom";
import { getUserProducts } from "../fetchMethods/get";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";

const Account = ({ user }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (user) {
      getUserProducts("purchased_products").then((res) => {
        setProducts(res.products);
      });
    }
  }, [user]);

  console.log(user);

  return (
    <>
      {/* If user doesn't exist go to the /signin */}
      {!user ? (
        <Navigate to="/signin" replace />
      ) : (
        <section>
          <header>
            <div>
              <div>
                <img src={accountIcon} alt="user" />
              </div>
            </div>
            <NavBar />
          </header>
        </section>
      )}
    </>
  );
};

export default Account;
