import express from "express";

import auth from "../middleware/auth.js";
import authController from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/signin", authController.signIn);
router.post("/auth/signup", authController.signUp);
router.post("/auth/refresh", auth, authController.refresh);

export default {
  router
};
