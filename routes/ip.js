import express from "express";

import ipController from "../controllers/ip.js";

const router = express.Router();

router.post("/ips", ipController.add);
router.get("/ips", ipController.getAll);

export default {
  router
};
