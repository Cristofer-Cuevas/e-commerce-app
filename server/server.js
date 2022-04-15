import express from "express";
import cors from "cors";
import userAuthRouter from "./routes/userAuthRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  app.use(userAuthRouter);
  app.use(shopRoutes);
  console.log(`Server running on port ${PORT}`);
});
