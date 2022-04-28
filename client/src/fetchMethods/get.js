import { getCookie } from "../utils/utils.js";

export const getAuth = () => {
  const cookieValue = getCookie();

  return fetch("http://localhost:3001/protected", {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
};

//Getting contacts
export const getProducts = (products) => fetch(`http://localhost:3001/${products}`).then((res) => res.json());

// Getting Messages

export const getUserProducts = (typeOfProducts) => {
  const cookieValue = getCookie();

  return fetch(`http://localhost:3001/${typeOfProducts}`, {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  }).then((res) => res.json());
};
