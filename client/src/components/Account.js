import React, { useEffect, useState } from "react";
import { Loading, NavBar } from "./ComponentUtils";
import { useNavigate } from "react-router-dom";
import { getUserProducts } from "../fetchMethods/get";
import accountIcon from "../styles/images/account_circle_white_24dp.svg";

const Account = () => {
  const [products, setProducts] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProducts().then((res) => {
      if (res.success) setShowSpinner(false);
      setProducts(res.products);
    });
  }, []);

  return (
    <>
      {showSpinner ? null : ( // <Loading />
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
