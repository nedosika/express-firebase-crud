import express from "express";

import ipController from "../controllers/ip.js";

const router = express.Router();

router.post('/ip', ipController.add);
router.get('/ip', ipController.getAll);
// router.get('/films/:id', ipController.getOne);
// router.put('/films/:id', ipController.update);
// router.delete('/films/:id', ipController.remove);

export default {
    routes: router
}