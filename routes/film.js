import express from "express";

import filmController from "../controllers/film.js";

const router = express.Router();

router.post('/films', filmController.add);
router.get('/films', filmController.getAll);
router.get('/films/:id', filmController.getOne);

export default {
    routes: router
}