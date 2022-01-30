import express from "express";
import auth from "../middleware/auth.js"

import rootController from "../controllers/root.js";

const router = express.Router();

router.get("/", rootController.helloWorld);
router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

export default {
  routes: router
};
