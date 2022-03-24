import express from "express";

import authController from "../controllers/auth.js";

const router = express.Router();

router.post("/auth/signin", authController.signIn);
router.post("/auth/signup", authController.signUp);
router.post("/auth/refresh", authController.refresh);

export default {
  router
};
