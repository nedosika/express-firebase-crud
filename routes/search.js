import express from "express";

import filmController from "../controllers/film.js";

const router = express.Router();

router.post("/search", filmController.getAllByQuery);

export default {
  router
};
