import pool from "../db/connection.js";
import fetch from "node-fetch";

const shopControllers = {};

shopControllers.getClothes = async (req, res) => {
  const womenClothing = await fetch("https://fakestoreapi.com/products/category/women's clothing");
  const menClothing = await fetch("https://fakestoreapi.com/products/category/men's clothing");
  const womenResponse = await womenClothing.json();
  const menResponse = await menClothing.json();

  res.json({ clothes: [...womenResponse, ...menResponse] });
};

shopControllers.getJewellery = async (req, res) => {
  const jewellery = await fetch("https://fakestoreapi.com/products/category/jewelery");
  const response = await jewellery.json();

  res.json({ jewellery: response });
};

shopControllers.getElectronics = async (req, res) => {
  const electronics = await fetch("https://fakestoreapi.com/products/category/electronics");

  const response = await electronics.json();
  res.json({ electronics: response });
};

shopControllers.getUserPurchasedProducts = async (req, res) => {
  const { authorization: token } = req.headers;
  const response = await fetch("https://user-auth-restful-api.herokuapp.com/protected", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    }),
  });
  const { success, user, unauthorized } = await response.json();

  if (success) {
    const { rows: purchasedProducts } = await pool.query("SELECT product_id, price, quantity, date FROM purchased_products where id = $1", [user.id]);
    let products = [];
    for (let product of purchasedProducts) {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`);

      const productsJson = await response.json();
      products.push({ products: productsJson, price: product.price, quantity: product.quantity, date: product.date });
    }
    res.json({ success, products });
  } else {
    res.json({ success, unauthorized });
  }
};

//  Get products saved in cart_products
shopControllers.getUserCartProducts = async (req, res) => {
  const { authorization: token } = req.headers;
  const response = await fetch("https://user-auth-restful-api.herokuapp.com/protected", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    }),
  });
  const { success, user, unauthorized } = await response.json();

  if (success) {
    const { rows: cartProducts } = await pool.query("SELECT product_id, quantity FROM cart_products where id = $1", [user.id]);
    let products = [];
    for (let product of cartProducts) {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`);

      const productsJson = await response.json();
      products.push({ products: productsJson, quantity: product.quantity });
    }
    res.json({ success, products });
  } else {
    res.json({ success, unauthorized });
  }
};
export default shopControllers;
