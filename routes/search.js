import express from "express";

import filmController from "../controllers/film.js";

const router = express.Router();

router.post("/search", filmController.search);
router.post("/query", filmController.getByQuery);

export default {
  router
};
