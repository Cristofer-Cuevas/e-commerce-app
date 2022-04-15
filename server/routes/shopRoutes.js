import express from "express";
import shopControllers from "../controllers/shopControllers.js";

const shopRoutes = express.Router();

shopRoutes.get("/clothes", shopControllers.getClothes);

export default shopRoutes;
