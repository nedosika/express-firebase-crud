import express from "express";

import auth from "../middleware/auth.js";
import favoritesController from "../controllers/favorites.js";

const router = express.Router();

router.get("/favorites/:id", favoritesController.get);
router.put("/favorites/:id", favoritesController.add);
router.delete("/favorites/:id", favoritesController.remove);

export default {
  router
};
