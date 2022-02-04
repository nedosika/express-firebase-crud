import express from "express";

import auth from "../middleware/auth.js";
import favoritesController from "../controllers/favorites.js";

const router = express.Router();

router.get("/favorites/:id", auth, favoritesController.get);
router.put("/favorites/:id", auth, favoritesController.add);
router.delete("/favorites/:id", auth, favoritesController.remove);

export default {
  router
};
