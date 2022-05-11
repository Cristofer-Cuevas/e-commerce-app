import pool from "../db/connection.js";
import fetch from "node-fetch";
import { Headers } from "node-fetch";

const shopControllers = {};

const getAuthUser = async (req) => {
  const { authorization: token } = req.headers;
  const response = await fetch("https://user-auth-restful-api.herokuapp.com/protected", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    }),
  });

  const user = await response.json();

  return user;
};

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

//  Get products saved in cart_products
shopControllers.getUserCartProducts = async (req, res) => {
  const { success, user, unauthorized } = await getAuthUser(req);

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

shopControllers.postPurchaseProducts = async (req, res) => {
  const { user } = await getAuthUser(req);

  const { products } = req.body;

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (user) {
    const totalPrice = products.reduce((previousValue, currentValue) => (previousValue += currentValue.price), 0);
    const { rows: credits } = await pool.query("SELECT credit FROM credits WHERE user_id = $1", [user.id]);
    if (credits[0]) {
      const posOrNeg = Math.sign(credits[0].credit - totalPrice);
      if (posOrNeg === -1) {
        res.json({ success: false, hasEnoughCredit: false });
      } else if (posOrNeg === 1) {
        const { rows: newCredit } = await pool.query("UPDATE credits SET credit = credit - $1 WHERE user_id = $2 RETURNING credit", [totalPrice, user.id]);
        for (let product of products) {
          await pool.query("INSERT INTO purchased_products VALUES ($1, $2, $3, $4, $5, $6)", [user.id, product.id, product.price, product.quantity, product.image, formattedDate]);
        }
        res.json({ success: true, credit: newCredit[0].credit });
      }
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
};

shopControllers.getPurchasedProducts = async (req, res) => {
  const { user } = await getAuthUser(req);
  console.log(user);

  const { rows: products } = await pool.query("SELECT * FROM purchased_products WHERE user_id = $1 ORDER BY date DESC", [user.id]);

  if (products[0]) {
    res.json({ success: true, products: products });
  } else {
    res.json({ success: false });
  }
};

export default shopControllers;
