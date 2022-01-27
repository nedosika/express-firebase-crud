import express from "express";

import config from "./config.js";

import ipRoutes from "./routes/ip.js";
import filmRoutes from "./routes/film.js";
import validatorRoutes from "./routes/validator.js";

const app = express();

app.use(express.json());
app.use('/api', filmRoutes.routes);
app.use('/api', ipRoutes.routes);
app.use('/api', validatorRoutes.routes);

const port = config.port || 6000;

app.listen(port, () => console.log("server started: " + port));