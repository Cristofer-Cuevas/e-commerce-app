import { getCookie } from "../utils/utils";

export const loginPost = ({ email, password }) => {
  return fetch("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const signupPost = ({ name, lastName, email, password }) => {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      lastName,
      email,
      password,
    }),
  });
};

export const postProductsToPurchase = (products) => {
  const cookieValue = getCookie();
  return fetch("http://localhost:3001/purchase-products", {
    method: "POST",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      products,
    }),
  }).then((res) => res.json());
};
