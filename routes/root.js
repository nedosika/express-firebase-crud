import express from "express";

import rootController from "../controllers/root.js";

const router = express.Router();

router.get("/", rootController.helloWorld);

export default {
  routes: router
};
