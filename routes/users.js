import express from "express";

import auth from "../middleware/auth.js";
import userController from "../controllers/user.js";

const router = express.Router();

router.put("/users/:id", auth, userController.update);
router.get("/users/:id", userController.getOne);

export default {
  router
};
