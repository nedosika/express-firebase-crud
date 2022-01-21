import express from "express";

import config from "./config.js";
import filmRoutes from "./routes/film.js";

const app = express();

app.use(express.json());
app.use('/api', filmRoutes.routes);

app.listen(config.port || 5000, () => console.log("server started: " + config.port))