import express from "express";

import authController from "../controllers/auth.js";

const router = express.Router();

router.post('/auth/signin', authController.signin);
router.post('/auth/signup', authController.signup);

export default {
    routes: router
}