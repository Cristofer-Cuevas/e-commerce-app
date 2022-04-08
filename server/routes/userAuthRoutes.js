import { Router } from "express";
import userAuthControllers from "../controllers/userAuthControllers.js";
const userAuthRouter = Router();

userAuthRouter.post("/signin", userAuthControllers.signin);
userAuthRouter.post("/signup", userAuthControllers.signup);
userAuthRouter.get("/protected", userAuthControllers.successRedirect);

export default userAuthRouter;
