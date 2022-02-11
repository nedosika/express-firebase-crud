import express from "express";

import auth from "../middleware/auth.js";
import filmController from "../controllers/film.js";

const router = express.Router();

router.get("/films", filmController.getAll);
router.post("/films", auth, filmController.add);
router.get("/films/:id", filmController.getOne);
router.put("/films/:id", auth, filmController.update);
router.delete("/films/:id", auth, filmController.remove);
router.post("/films/search", filmController.search);

export default {
  router
};
