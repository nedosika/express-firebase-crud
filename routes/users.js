import express from "express";

import auth from "../middleware/auth.js";
import usersController from "../controllers/user.js";

const router = express.Router();

router.put("/users/:id", auth, usersController.update);

export default {
  router
};
