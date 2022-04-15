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

export default shopControllers;
