import express from "express";
import cors from "cors";

import config from "./config.js";

import ip from "./routes/ip.js";
import films from "./routes/films.js";
import auth from "./routes/auth.js";
import validator from "./routes/validator.js";
import root from "./routes/root.js";
import user from "./routes/users.js";
import favorites from "./routes/favorites.js";
import search from "./routes/search.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", films.router);
app.use("/api", auth.router);
app.use("/api", ip.router);
app.use("/api", validator.router);
app.use("/api", user.router);
app.use("/api", favorites.router);
app.use("/api", search.router);
app.use("/", root.router);

const port = config.port || 6000;

app.listen(port, () => console.log("server started: " + port));
