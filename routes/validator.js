import express from "express";

import validator from "../controllers/validator.js";

const router = express.Router();

router.get('/validator', validator.validate);

export default {
    routes: router
}