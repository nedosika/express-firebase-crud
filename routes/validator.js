import express from "express";

import validatorController from "../controllers/validator.js";

const router = express.Router();

router.post("/validators/ip/", validatorController.ip);

export default {
  routes: router
};
