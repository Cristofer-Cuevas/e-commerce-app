import { getCookie } from "../utils/utils.js";

export const getAuth = () => {
  const cookieValue = getCookie();

  return fetch("https://e-commerce-appl.herokuapp.com/protected", {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
};

//Getting contacts
export const getProducts = (products) => fetch(`https://e-commerce-appl.herokuapp.com/${products}`).then((res) => res.json());

// Getting Messages

export const getUserProducts = (typeOfProducts) => {
  const cookieValue = getCookie();

  return fetch(`https://e-commerce-appl.herokuapp.com/${typeOfProducts}`, {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
};
