import express from "express";

import ipController from "../controllers/ip.js";

const router = express.Router();

router.post("/ip", ipController.add);
router.get("/ip", ipController.getAll);

export default {
  routes: router
};
