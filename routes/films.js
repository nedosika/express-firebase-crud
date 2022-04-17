import express from "express";
import { body, validationResult }  from 'express-validator';

import auth from "../middleware/auth.js";
import filmController from "../controllers/films.js";

const router = express.Router();

router.get("/films", filmController.getAll);
router.post(
    "/films",
    auth,
    body('name').isLength({min: 5}),
    body('img').isLength({min: 5}),
    body("genre").isIn(["Detective","Anime", "BlockBaster", "RomCom", "SciFi", "Horror"]),
    filmController.add
);
router.get("/films/:id", filmController.getOne);
router.put(
    "/films/:id",
    auth,
    body('name').isLength({min: 6}),
    body('img').isLength({min: 5}),
    body("genre").isIn(["Detective","Anime", "BlockBaster", "RomCom", "SciFi", "Horror"]),
    filmController.update
);
router.delete("/films/:id", auth, filmController.remove);
router.post("/films/search", filmController.search);

export default {
  router
};
