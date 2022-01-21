import express from "express";

import filmController from "../controllers/film.js";

const router = express.Router();

router.post('/films', filmController.add);
router.get('/films', filmController.getAll);
router.get('/films/:id', filmController.getOne);
router.delete('/films/:id', filmController.remove);

export default {
    routes: router
}