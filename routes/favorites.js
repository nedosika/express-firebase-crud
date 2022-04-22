import express from "express";

import auth from "../middleware/auth.js";
import favoritesController from "../controllers/favorites.js";

const router = express.Router();

router.get("/favorites", auth, favoritesController.get);
router.put("/favorites", auth, favoritesController.add);
router.delete("/favorites", auth, favoritesController.remove);

export default {
  router
};
